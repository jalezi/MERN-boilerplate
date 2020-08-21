const mongoose = require('mongoose');
const request = require('supertest');

const { connectToDB } = require('./config');
const app = require('./server');
const { dbOptions } = require('./config');

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

describe('DB connection', () => {
  let connection;
  let db;
  let mongoUri;
  let mongoDbName;

  beforeAll(async () => {
    mongoUri = global.__MONGO_URI__;
    mongoDbName = global.__MONGO_DB_NAME__;
    await connectToDB({
      url: mongoUri,
      options: { ...dbOptions, dbName: mongoDbName },
    });
    connection = mongoose.connection;
    db = connection.db;
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should connects to testing db', () => {
    const { url } = connection.client.s;
    const { databaseName } = db;
    expect(url).toBe(mongoUri);
    expect(databaseName).toBe(mongoDbName);
  });
});
