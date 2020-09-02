const isNotNodeEnvTest = () => {
  return !(process.env.NODE_ENV === 'test');
};

exports.isNotNodeEnvTest = isNotNodeEnvTest;

exports.exitEvents = Object.freeze({
  UNHANDLED_REJECTION: 'unhandledRejection',
  UNHANDLED_EXCEPTION: 'uncaughtException',
  SIGTERM: 'SIGTERM',
  SIGINT: 'SIGINT',
  SIGQUIT: 'SIGQUIT',
});
