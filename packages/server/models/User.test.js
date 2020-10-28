const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./User');
const { connectToDB, dbOptions } = require('../config');

const userDataOne = {
  email: 'example@example.com',
  password: 'test1234',
};

const userDataTwo = {
  email: 'usertwo@example.com',
  password: 'test1234',
};

describe('Require Modules', () => {
  test('connectToDb should be a function', () => {
    expect(connectToDB).toBeDefined();
    expect(typeof connectToDB).toBe('function');
  });

  test('dbOptions should be an object', () => {
    expect(dbOptions).toBeDefined();
    expect(typeof dbOptions).toBe('object');
  });

  test('User model should be defined', () => {
    expect(User).toBeDefined();
  });

  test('new User should be instance of mongoose Model', () => {
    expect(new User()).toBeInstanceOf(mongoose.Model);
  });
});

describe('User Model Test', () => {
  let connection;
  let db;
  let mongoUri;
  let mongoDbName;

  beforeAll(async () => {
    mongoUri = global.__MONGO_URI__;
    mongoDbName = global.__MONGO_DB_NAME__;
    await connectToDB(
      {
        url: mongoUri,
        options: { ...dbOptions, dbName: mongoDbName },
      },
      err => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
      }
    );
    connection = mongoose.connection;
    db = connection.db;
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
    // https://github.com/shelfio/jest-mongodb/issues/214
    fs.unlink(process.cwd() + '/globalConfig.json', () => {});
  });

  it('creates & saves user successfully', async () => {
    const validUser = new User(userDataOne);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userDataOne.email);
    expect(savedUser.password).toBe(userDataOne.password);
    // expect(savedUser.dob).toBe(userData.dob);
    // expect(savedUser.loginUsing).toBe(userData.loginUsing);
  });

  it('finds user by id', async () => {
    const validUser = new User(userDataTwo);
    const savedUser = await validUser.save();
    const user = await User.findById(savedUser.id);
    expect(user.id).toEqual(savedUser.id);
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it('inserts user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new User({
      name: 'TekLoon',
      gender: 'Male',
      nickname: 'Handsome TekLoon',
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickname).toBeUndefined();
  });

  // It should us told us the errors in on gender field.
  it('creates user without required field should failed', async () => {
    const userWithoutRequiredField = new User({ name: 'TekLoon' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.gender).toBeDefined();
  });
});
