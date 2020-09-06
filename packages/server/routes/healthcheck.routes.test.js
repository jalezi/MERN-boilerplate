const request = require('supertest');
const { app } = require('../app');
const mongoose = require('mongoose');
const { connectToDB, dbUriTest, dbOptions } = require('../config');

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

  it('returns 503 if server is running and DB not connected', async () => {
    await connection.close();
    const res = await request(app).get(`/healthcheck`, null).expect(503);
    expect(res.body.uptime).toBeGreaterThan(0);
    expect(res.body.dbConnectionStatus).toBe(0);
    expect(res.body.message).toBe(
      'DB not connected. DB connection state is: disconnected'
    );
  });
});
