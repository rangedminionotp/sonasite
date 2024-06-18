import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';
import * as db from '../db';
import * as login from '../login';
import requestHandler from './requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = http.createServer(requestHandler);
  await new Promise(resolve => server.listen(resolve));
  request = supertest(server);
  // await db.reset(); // Ensure the database is in a known state before tests
});

afterAll((done) => {
  server.close(done);
  db.shutdown();
});

// test('Successful Login', async () => {
//   const member = login.molly;
//   await request.post('/api/graphql')
//     .send({
//       query: `
//         mutation {
//           login(email: "${member.email}", password: "${member.password}") {
//             name
//             accessToken
//           }
//         }
//       `,
//     })
//     .then((res) => {
//       console.log('Response:', res); // Log the complete response
//       console.log('Response Body:', res.body); // Log the body of the response

//       expect(res).toBeDefined();
//       expect(res.body).toBeDefined();

//       if (res.body.errors) {
//         console.error('GraphQL Errors:', res.body.errors); // Log any GraphQL errors
//       }

//       expect(res.body.data).toBeDefined();
//       expect(res.body.data.login).toBeDefined();
//       expect(res.body.data.login.name).toEqual('Molly Member');
//       expect(res.body.data.login.accessToken).toBeDefined();
//     })
//     .catch((err) => {
//       console.error('Request Failed:', err); // Log any request errors
//     });
// });

test('OK', async () => {
  const member = login.molly;
  await request.post('/api/graphql')
    .send({query: `{login(email: "${member.email}" password: 
      "${member.password}") { name, accessToken }}`})
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data.login.name).toEqual('Molly Member')
      expect(res.body.data.login.accessToken).toBeDefined()
    });
});