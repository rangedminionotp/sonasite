/**
 * @jest-environment node
 */

import GET from "../../../src/app/api/test/index";
import { mockNextRequest, mockNextResponse } from "../mockNextReqRes";
describe("API Route Tests", () => {
  it("should return a successful response", async () => {
    const req = mockNextRequest();
    const res = mockNextResponse();
    await GET(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "OK!" });
  });
});
