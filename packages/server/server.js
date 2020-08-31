module.exports = async (app, port = 3000) => {
  return app.listen(port, err => {
    if (err) {
      console.log('something bad happened', err);
    } else {
      process.send = process.send || function () {};
      process.send && process.send('online');
      console.log(`Server is listening on ${port}`);
    }
  });
};
