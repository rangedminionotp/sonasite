import http from 'http'
import supertest from 'supertest';
import 'whatwg-fetch'

import * as login from '../login'
import requestHandler from './requestHandler'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll( async () => {
  server = http.createServer(requestHandler);
  server.listen();
  request = supertest(server)
});

afterAll((done) => {
  server.close(done);
});

const bad = {
  email: 'molly_at_books.com',
  password: 'mollymember',
};

const wrong = {
  email: 'molly@books.com',
  password: 'notmollyspasswd',
};

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

test('Wrong Credentials', async () => {
  const member = wrong;
  await request.post('/api/graphql')
    .send({query: `{login(email: "${member.email}" password: 
      "${member.password}") { name, accessToken }}`})
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data.body.errors.length).toEqual(1)
    });
});

test('Bad Format', async () => {
  const member = bad;
  await request.post('/api/graphql')
    .send({query: `{login(email: "${member.email}" password: 
      "${member.password}") { name, accessToken }}`})
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data.body.errors.length).toEqual(1)
    });
});  