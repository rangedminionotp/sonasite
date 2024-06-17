const glob = require("glob");
const path = require("path");
const { apiResolver } = require("next/dist/server/api-utils");

const rootPath = path.resolve(".");
const nextPagesDirectory = `${rootPath}\src\app`;

const handlers = glob
  .sync(`${nextPagesDirectory}/api/**/*.ts`)
  .map((handler) => handler.slice(nextPagesDirectory.length, -3));

const mapping = {};
handlers.forEach((handler) => {
  mapping[handler] = require(`${nextPagesDirectory}${handler}`).default;
});

const requestHandler = (request, response) => {
  const handler = mapping[request.url];
  if (!handler) {
    response.statusCode = 404;
    return response.end("Not Found");
  }

  return apiResolver(
    Object.assign(request, { connection: { remoteAddress: "localhost" } }),
    response,
    null,
    handler,
    {},
    true
  );
};

module.exports = requestHandler;
