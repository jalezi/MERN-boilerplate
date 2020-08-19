const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = 4000;

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

app.post('/api', (req, res) => {
  res.json({ status: 200, ...req.body });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
