const isNodeEnvTest = () => {
  return !(process.env.NODE_ENV === 'test');
};

exports.isNodeEnvTest = isNodeEnvTest;

exports.exitEvents = Object.freeze({
  UNHANDLED_REJECTION: 'unhandledRejection',
  UNHANDLED_EXCEPTION: 'uncaughtException',
  SIGTERM: 'SIGTERM',
  SIGINT: 'SIGINT',
  SIGQUIT: 'SIGQUIT',
});
