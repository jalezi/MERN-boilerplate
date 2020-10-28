const User = require('../models/User');

module.exports.signupGet = (req, res) => {
  res.send('signup');
};
module.exports.signupPost = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.loginGet = (req, res) => {
  res.send('login');
};
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  res.json({ email, password });
};
