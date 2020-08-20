const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const { connectToDB } = require('./config');

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = 4000; // port must match proxy settings in client package.json

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());

app.get('/api', (req, res) => {
  res.json({ status: 200, message: 'GET /api' });
});

if (env !== 'test') {
  (async () => {
    await connectToDB();
  })();

  process.on('SIGINT', async () => {
    await mongoose.connection.close(() => {
      console.log(
        'Mongoose default connection is disconnected due to application termination!'
      );
      process.exit(0);
    });
  });

  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
}

module.exports = app;
