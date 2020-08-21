const mongoose = require('mongoose');

const { connectToDB } = require('.');
const { dbUri, dbUriTest, dbOptions } = require('.');

describe('Require Modules', () => {
  it('connectToDb should be a function', () => {
    expect(connectToDB).toBeDefined();
    expect(typeof connectToDB).toBe('function');
  });

  it('dbUri should be a string', () => {
    expect(dbUri).toBeDefined();
    expect(typeof dbUri).toBe('string');
  });
  it('dbUriTest should be string', () => {
    expect(dbUriTest).toBeDefined();
    expect(typeof dbUriTest).toBe('string');
  });
  it('dbOptions should be an object', () => {
    expect(dbOptions).toBeDefined();
    expect(typeof dbOptions).toBe('object');
  });
});

describe('DB test connection dbName = mernTest', () => {
  let connection;
  let db;

  beforeAll(async () => {
    await connectToDB({ url: dbUriTest, options: dbOptions });
    connection = mongoose.connection;
    db = connection.db;
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should connects to testing database', () => {
    const { url } = connection.client.s;
    const { databaseName } = db;
    expect(url).toBe(dbUriTest);
    expect(databaseName).toBe('mernTest');
  });
});
