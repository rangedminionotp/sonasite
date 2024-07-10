const glob = require("glob");
const path = require("path");
const { apiResolver } = require("next/dist/server/api-utils");

const rootPath = path.resolve(".");
const nextPagesDirectory = `${rootPath}\\src\\app`;
const handlers = glob
  .sync(`${nextPagesDirectory}/api/graphql/**/*.ts`)
  .map((handler) => {
    return handler.replace(/\\/g, "/");
  });
//   .map((handler) => handler.slice(nextPagesDirectory.length, -3));

const mapping = {};
handlers.forEach((handler) => {
  const handlerPath = handler.replace(/^src\/app/, "").replace(/\/$/, ""); // Normalize the handler path

  mapping[`${handler}`] = require(`${nextPagesDirectory}${handlerPath}`);
});

const requestHandler = (request, response) => {
  const handlerPath = request.url.split("?")[0]; // Extract the path without query parameters
  const handler = mapping[handlerPath];

  if (!handler) {
    response.statusCode = 404;
    response.end("Not Found");
    return;
  }

  return apiResolver(
    Object.assign(request, {
      connection: { remoteAddress: process.env.POSTGRES_HOST },
    }),
    response,
    {},
    handler,
    undefined,
    true
  );
};

module.exports = requestHandler;
