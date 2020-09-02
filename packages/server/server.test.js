const createHttpServer = require('./server');
const express = require('express');

describe('Test Server', () => {
  test('Server listen on default port', async () => {
    let server, app;
    app = express();
    server = await createHttpServer(app);
    const port = server.address().port;
    expect(port).toBe(3000);
    await server.close();
  });

  test('Server listen on port 5000', async () => {
    let server, app;
    app = express();
    server = await createHttpServer(app, 5000);
    const port = server.address().port;
    expect(port).toBe(5000);
    await server.close();
  });
});
