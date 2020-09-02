const request = require('supertest');
const { app } = require('../app');
const mongoose = require('mongoose');
const { connectToDB, dbUriTest, dbOptions } = require('../config');
const { healthCheckController } = require('../controllers/healthcheck.contr');

describe('Healthcheck', () => {
  let connection;

  beforeEach(async () => {
    await connectToDB({ url: dbUriTest, options: dbOptions });
    connection = mongoose.connection;
  });

  afterEach(async () => {
    await connection.close();
  });

  it('returns 200 if server is running and DB connected', async () => {
    const res = await request(app).get(`/healthcheck`, null).expect(200);
    expect(res.body.uptime).toBeGreaterThan(0);
    expect(res.body.dbConnectionStatus).toBe(1);
  });

  it('returns 200 if server is running and DB not connected', async () => {
    await connection.close();
    const res = await request(app).get(`/healthcheck`, null).expect(200);
    expect(res.body.uptime).toBeGreaterThan(0);
    expect(res.body.dbConnectionStatus).toBe(0);
  });
});
