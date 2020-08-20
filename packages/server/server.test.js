const mongoose = require('mongoose');
const request = require('supertest');

const { connectToDB } = require('./config');
const app = require('./server');
const { dbUriTest: dbUri } = require('./config');

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

  beforeAll(async () => {
    await connectToDB();
    connection = mongoose.connection;
    db = connection.db;
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should connects to testing db', () => {
    const { name } = connection;
    const { url } = connection.client.s;
    expect(dbUri).toBe(url);
    expect(db.databaseName).toBe(name);
  });
});
