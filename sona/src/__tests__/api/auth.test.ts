/**
 * @jest-environment node
 */
import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';
import * as db from '../db';
import * as login from '../login';
import requestHandler from './requestHandler';
import { setupServer } from 'msw/node';
import { graphql } from 'msw';

const handlers = [
  graphql.query('get', async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('anna@books.com') >= 0) {
      return res(
        ctx.data({
          get: {
            id: '9c838adb-0cb9-4dda-a1d3-946412aa1183',
            email: 'anna@books.com',
            roles: ['member', 'admin'],
            name: 'Anna Admin',
            password: '$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze',
          },
        })
      );
    } else if (json.query.indexOf('molly@books.com') >= 0) {
      return res(
        ctx.data({
          get: {
            id: '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04',
            email: 'molly@books.com',
            roles: ['member'],
            name: 'Molly Member',
            password: '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y',
          },
        })
      );
    } else {
      return res(
        ctx.data({
          get: {
            id: '5fd30fce-3f7c-4096-9051-e99c1ffa950a',
            email: 'nobby@books.com',
            roles: [],
            name: 'Nobby Nobody',
            password: '$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm',
          },
        })
      );
    }
  }),
];
const server2 = setupServer(...handlers);
let server;
let request;

beforeAll(async () => {
  server = http.createServer(requestHandler);
  server.listen();
  server2.listen();
  request = supertest(server);
//   await db.reset();
});
afterEach(() => server2.resetHandlers());
afterAll((done) => {
  server.close(done);
  server2.close();
  db.shutdown();
});

const wrong = {
  email: 'molly@books.com',
  password: 'notmollyspasswd',
};

test('OK', async () => {
  const member = login.molly;
  await request
    .post('/api/graphql')
    .send({
      query: `{login(email: "${member.email}" password: "${member.password}") { name, accessToken }}`,
    })
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data.login.name).toEqual('Molly Member');
      expect(res.body.data.login.accessToken).toBeDefined();
    });
});
