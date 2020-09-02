const { createHttpServer, appListenCallback } = require('./server');
const express = require('express');

describe('Testing Server Port', () => {
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

describe('Testing app.listen() callback', () => {
  test('appListenCallback should be defined', () => {
    expect(appListenCallback).toBeDefined();
  });

  test('appListenCallback should return a function', () => {
    const cb = appListenCallback();
    expect(cb).toBeInstanceOf(Function);
  });

  test('Callback should throw an error', () => {
    const cb = appListenCallback();
    expect(() => {
      cb(new Error('My Error'));
    }).toThrowError('My Error');
  });

  test('Callback should pass without an error', () => {
    const cb = appListenCallback();
    expect(() => {
      cb();
    }).not.toThrowError();
  });
});
