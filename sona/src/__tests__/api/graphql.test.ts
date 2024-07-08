/**
 * @jest-environment node
 */

import { Server } from "http";
import supertest from "supertest";
import { startTestServer } from "../server";
import { asAnna } from "../login";
let server: Server;
beforeAll(async () => {
  server = await startTestServer();
});
afterAll(() => {
  server.close();
});
describe("API Route Tests", () => {
  it("should return a successful response", async () => {
    const request = supertest(server);
    const accessToken = await asAnna(request);
    expect(typeof accessToken).toBe("string");
    const query = {
      query: `
          query MyQuery {
            getAllAbility {
              abilityId
              abilityName 
              fullName 
            }
          }
        `,
    };
    const res = await request
      .post("/api/graphql")
      .accept("application/json")
      .send(query);
    expect(res.status).toBe(200);
    const expected = {
      data: {
        getAllAbility: [
          {
            abilityId: "60028b69-8180-4d66-8331-c42a0426ab5f",
            abilityName: "Q",
            fullName: "Hymn of Valor",
          },
          {
            abilityId: "223eeef1-8046-49a4-abb8-e6c86eb5d392",
            abilityName: "W",
            fullName: "Aria of Perseverance",
          },
          {
            abilityId: "8a29baf7-e2dc-47c0-ace4-1c5844ff8a71",
            abilityName: "E",
            fullName: "Song of Celerity",
          },
          {
            abilityId: "93007fa7-7ce6-4a55-812c-cb93376b6144",
            abilityName: "R",
            fullName: "Crescendo",
          },
          {
            abilityId: "27ce1177-a9c5-44e6-b450-bd1c3c4c54a9",
            abilityName: "Passive",
            fullName: "Power Chord",
          },
        ],
      },
    };
    expect(res.body).toStrictEqual(expected);
  });
});
