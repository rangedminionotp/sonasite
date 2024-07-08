import next from "next";
import { createServer } from "http";
import { parse } from "url";

export const startTestServer = async () => {
  const app = next({ dev: false });
  const handle = app.getRequestHandler();
  await app.prepare();
  const server = createServer(async (req, res) => {
    const parsedUrl = parse(req.url || "", true);
    await handle(req, res, parsedUrl);
  });
  // if the server is passed to supertest no need to run .listen, supertest will start it.
  return server;
};
