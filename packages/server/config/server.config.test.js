const express = require('express');
const mongoose = require('mongoose');
const {
  appInit,
  createHttpServer,
  appListenCallback,
} = require('./server.config');

describe('Testing app.listen(port, cb) Callback Function', () => {
  test('appListenCallback should be defined', () => {
    expect(appListenCallback).toBeDefined();
  });

  test('appListenCallback should return a function', () => {
    const cb = appListenCallback();
    expect(cb).toBeInstanceOf(Function);
  });

  test('Callback should throw an error', async () => {
    const cb = appListenCallback();
    const err = cb(new Error('My Error'));
    await expect(err).rejects.toBeInstanceOf(Error);
  });

  test('Callback should pass without an error', () => {
    const cb = appListenCallback();
    expect(() => {
      cb();
    }).not.toThrowError();
  });
});

describe('Testing Create Server Function', () => {
  let server, app;
  beforeAll(async () => {
    app = express();
  });

  test('Server listen on default port', async () => {
    server = await createHttpServer(app);
    const port = server.address().port;
    expect(port).toBe(3000);
    await server.close();
  });

  test('Server listen on port 5000', async () => {
    server = await createHttpServer(app, 5000);
    const port = server.address().port;
    expect(port).toBe(5000);
    await server.close();
  });

  test('Should throw an error', async () => {
    await expect(createHttpServer(app, 'xxxx')).rejects.toThrowError(
      'Port is not a number'
    );
  });
});

describe('Testing App Initialization Functions', () => {
  const app = express();
  const serverInit = appInit();

  describe('Testing appInit Function', () => {
    it('should be defined and instance of function', () => {
      expect(appInit).toBeDefined();
      expect(appInit).toBeInstanceOf(Function);
    });

    it('should return new function', () => {
      expect(serverInit).toBeInstanceOf(Function);
    });
  });

  describe('Testing Function Returned from appInit Function ', () => {
    let server;
    beforeAll(async () => {
      server = await serverInit(app);
    });

    afterAll(async () => {
      await server.close();
      await mongoose.connection.close();
    });

    test('Server is defined', () => {
      expect(server).toBeDefined();
    });
  });
});
