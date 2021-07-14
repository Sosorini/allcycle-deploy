// eslint-disable-next-line import/no-extraneous-dependencies
import { Server } from "miragejs";

import mockProduct from "@/lib/routes/mockProduct";

const createMirageServer = () => {
  const server = new Server({
    routes() {
      this.urlPrefix = process.env.API_BASE_URL;

      mockProduct(this);
    },
  });

  return server;
};

export default createMirageServer;
