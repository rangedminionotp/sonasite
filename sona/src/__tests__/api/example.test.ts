import request from 'supertest';
import { startTestServer } from '../testServer';

let server: any;

beforeAll(async () => {
  server = await startTestServer();
});

afterAll(() => {
  server.close();
});

describe('API Route Tests', () => {
  it('should return a successful response', async () => {
    const res = await request(server).get('/api/example');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Hello, world!' });
  });
});