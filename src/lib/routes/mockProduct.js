// eslint-disable-next-line import/no-extraneous-dependencies
import { Server, Response } from "miragejs";

const mockProduct = () => {
  Server.get("/api/product/", (_, request) => {
    return new Response(200, {}, {
      result: true,
      data: [{
        _id: "id1",
        name: "product1",
        imgUrl: "imgUrl1",
        imgAlt: "imgAlt1",
        recycleType: "plastic",
        productType: "coffee",
      }],
    });
  });
};

export default mockProduct;
