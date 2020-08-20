exports.dbUri = 'mongodb://localhost:27017/mern';
exports.dbUriTest = 'mongodb://localhost:27017/mernTest';
exports.dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

exports.connectToDB = require('./mongoose');
