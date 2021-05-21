import AWS from "aws-sdk";
import { getSession } from "next-auth/client";
import fetch from "node-fetch";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Product from "@/models/Product";
import getImgBuffer from "@/utils/getImgBuffer";
import {
  BUCKET,
  ACL,
  CONTENT_ENCODING,
  CONTENT_TYPE,
} from "@/constants/awsParams";
// import callVisionAPI from "@/utils/callVisionAPI";

const { AWS_ACCESS_ID_MYAPP, AWS_ACCESS_KEY_MYAPP } = process.env;
AWS.config.credentials = new AWS.Credentials(AWS_ACCESS_ID_MYAPP, AWS_ACCESS_KEY_MYAPP);

export default async (req, res) => {
  const { body: uri } = req;

  try {
    const session = await getSession({ req });

    if (!session) {
      console.log("session이 없음");
      return res.json({
        result: false,
        error: "TRY AGAIN!!",
      });
    }

    const { email } = session.user;

    const body = {
      requests: [
        {
          image: { content: uri.slice(23) },
          features: [{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 }],
        },
      ],
    };

    const response = await fetch(process.env.GOOGLE_VISION_API_URL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const parsed = await response.json();

    if (!Object.entries(parsed.responses[0]).length) {
      return [];
    }

    const detectedText = parsed.responses[0].fullTextAnnotation.text;

    if (!detectedText.length) {
      return res.json({
        result: false,
        error: "TRY AGAIN!!",
      });
    }

    const textList = detectedText.split(/\n/);
    const keywords = textList.filter((text) => text.length >= 2);

    await connectDB();

    const productList = await Product.find().select("name");
    const productInfo = productList.find((product) => {
      return keywords.some((keyword) => {
        return product.name.includes(keyword);
      });
    });

    if (!productInfo) {
      return res.json({
        result: false,
        error: "TRY AGAIN!!",
      });
    }

    const s3 = new AWS.S3();
    const buffer = getImgBuffer(uri);

    const params = {
      Bucket: BUCKET,
      Key: `${email.slice(0, 5)}/${new Date().getTime()}`,
      Body: buffer,
      ACL,
      ContentEncoding: CONTENT_ENCODING,
      ContentType: CONTENT_TYPE,
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        throw new Error("s3 upload failed");
      }

      try {
        await User.findOneAndUpdate(
          { email },
          {
            $push: { pictures: data.Location },
          },
        );
      } catch (err) {
        res.json({
          result: false,
          error: err.message,
        });
      }
    });

    return res.json({
      result: true,
      data: productInfo,
    });
  } catch (error) {
    return res.status(400).json({
      result: false,
      error: error.message,
    });
  }
};
