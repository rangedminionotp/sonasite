/**
 * @jest-environment node
 */

import { Server } from "http";
import supertest from "supertest";
import { startTestServer } from "../server";
let server: Server;
beforeAll(async () => {
  server = await startTestServer();
});
afterAll(() => {
  server.close();
});
describe("API Route Tests", () => {
  it("should return a successful response", async () => {
    // to test the server while nextjs is running with a custom server the test should run
    // with a production build of nextjs app.
    // reason is that nextjs app in dev mode is too slow and have webpack watch mode and other cavetes too.

    const res = await supertest(server).get("/api/test");
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ message: "OK!" });

    // another option is to call the request handler directly and pass
    // request/response mocks.

    /* const req = mockNextRequest();
    const res = mockNextResponse();
    await GET(req, res); */
    /* expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "OK!" }); */
  });
});
