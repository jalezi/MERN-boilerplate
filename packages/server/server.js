module.exports = async (app, port = 3000) => {
  return app.listen(port, err => {
    if (err) {
      console.log('something bad happened', err);
      // TODO Do I need: return Promise.reject(err) or something else or just logging?
      // Promise.reject(err.message);
      return Promise.reject(err.message);
      // throw new Error(err.message);
      // return new Error(err.message);
    } else {
      process.send = process.send || function () {};
      process.send && process.send('online');
      console.log(`Server is listening on ${port}`);
    }
  });
};
