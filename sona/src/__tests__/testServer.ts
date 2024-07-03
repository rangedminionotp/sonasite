import next from 'next';
import { createServer } from 'http';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

export const startTestServer = async () => {
  await app.prepare();
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  await new Promise<void>((resolve, reject) => {
    server.listen((err: any) => {
      if (err) reject(err);
      resolve();
    });
  });

  return server;
};