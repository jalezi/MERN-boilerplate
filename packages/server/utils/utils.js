const isNodeEnvTest = () => {
  return !(process.env.NODE_ENV === 'test');
};

exports.isNodeEnvTest = isNodeEnvTest;
