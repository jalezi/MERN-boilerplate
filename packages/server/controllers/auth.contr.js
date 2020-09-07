module.exports.signupGet = (req, res) => {
  res.send('signup');
};
module.exports.signupPost = (req, res) => {
  const { email, password, confirmPassword } = req.body;
  res.json({ email, password, confirmPassword });
};
module.exports.loginGet = (req, res) => {
  res.send('login');
};
module.exports.loginPost = (req, res) => {
  const { email, password } = req.body;
  res.json({ email, password });
};
