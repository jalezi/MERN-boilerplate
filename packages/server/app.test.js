const request = require('supertest');

const { connectToDB } = require('./config');
const { app } = require('./app');
const { dbOptions } = require('./config');

test('Sample test', () => {
  expect(true).toBe(true);
});

describe('Require Modules', () => {
  it('connectToDb should be a function', () => {
    expect(connectToDB).toBeDefined();
    expect(typeof connectToDB).toBe('function');
  });

  it('dbOptions should be an object', () => {
    expect(dbOptions).toBeDefined();
  });
});

describe('Endpoints', () => {
  it('should get /api', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('success');
  });

  it('returns 404', async () => {
    await request(app).get(`/foo/bar`, null).expect(404);
  });

  it('returns 500', async () => {
    const res = await request(app).get('/api/error');
    expect(res.statusCode).toEqual(500);
  });

  it('returns 501', async () => {
    const res = await request(app).post('/api/error');
    expect(res.statusCode).toEqual(501);
  });
});
