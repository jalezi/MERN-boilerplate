const app = require('./server');
const request = require('supertest');

test('Sample test', () => {
  expect(true).toBe(true);
});

describe('Endpoints', () => {
  it('should get /api', async done => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('GET /api');
    done();
  });
});
