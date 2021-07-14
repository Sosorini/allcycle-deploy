// eslint-disable-next-line import/no-extraneous-dependencies
import { Server, Response } from "miragejs";

const mockProduct = () => {
  Server.get("/api/manager", (_, request) => {
    console.log("teststestset");
    return new Response(200, {}, {
      result: true,
      count: 2,
    });
  });
};

export default mockProduct;
