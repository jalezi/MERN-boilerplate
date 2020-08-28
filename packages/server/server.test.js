const request = require('supertest');

const { connectToDB } = require('./config');
const { app } = require('./server');
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
  it('should get /api', async done => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('GET /api');
    done();
  });
});
