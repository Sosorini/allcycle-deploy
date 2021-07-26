import fs from "fs";
import cheerio from "cheerio";
import imgDownload from "image-downloader";

import { getAllLetterList } from "@/utils/letterAPI";
import LetterContainer from "@/components/layout/webLetter";
import {
  Container,
  ToggleContainer,
  Toggle,
} from "@/components/layout/webLetter/styled";
import urls from "../constants/webletterUrls";

export default function WebLetter({ letters, message }) {
  return (
    <Container>
      <ToggleContainer>
        <Toggle>
          <a href="http://ecoseoul.or.kr/">@서울환경연합</a>
        </Toggle>
      </ToggleContainer>

      <LetterContainer letters={letters} />
    </Container>
  );
}

export async function getStaticProps() {
  try {
    const letterScraps = [];

    for (let i = 0; i < urls.length; i++) {
      const currentPage = urls[i];

      const response = await fetch(currentPage, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const html = await response.text();
      const $ = cheerio.load(html);
      const $bodyList = $("ul.cat-list > li").children("a");

      const asyncFuncs = $bodyList.map(async (_, elem) => {
        const { title, href } = elem.attribs;
        const src = $(elem).find("img").attr("src");
        const imageUrl = encodeURI(src);

        const sliceIndex = title.indexOf("]") + 1;
        let realTitle = title.slice(0, sliceIndex);
        realTitle = realTitle.replace(/[^0-9]/gi, "");

        if (!realTitle || !src || !title || !href) {
          return;
        }

        await imgDownload.image({
          url: imageUrl,
          dest: `${process.cwd()}/public/_assets/${realTitle}.jpg`,
        });

        const data = `---\nhref: '${href}'\ntitle: '${title}'\nimg: '/_assets/${realTitle}.jpg'\n---`;

        fs.writeFile(`${process.cwd()}/public/_letter/${realTitle}.md`, data, (err) => {
          if (err) {
            throw new Error(`${realTitle}의 파일쓰기가 실패했습니다.`);
          }
        });

        return {
          href,
          title,
          img: `/_assets/${title.slice(7, 10)}.jpg`,
        };
      });

      letterScraps.push(...asyncFuncs);
    }

    await Promise.all(letterScraps);

    const letters = getAllLetterList([
      "slug",
      "href",
      "title",
      "img",
    ]);

    return {
      props: { letters },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { message: err.message },
    };
  }
}
