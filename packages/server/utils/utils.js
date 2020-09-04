const isNotNodeEnvTest = () => {
  return !(process.env.NODE_ENV === 'test');
};

exports.isNotNodeEnvTest = isNotNodeEnvTest;

exports.shouldConsoleLog = isNotNodeEnvTest();

exports.exitEvents = Object.freeze({
  UNHANDLED_REJECTION: 'unhandledRejection',
  UNHANDLED_EXCEPTION: 'uncaughtException',
  SIGTERM: 'SIGTERM',
  SIGINT: 'SIGINT',
  SIGQUIT: 'SIGQUIT',
});

exports.addListenersToProcess = exitHandler => {
  process.on('uncaughtException', exitHandler(1, 'uncaughtException')); // Unexpected Error
  process.on('unhandledRejection', exitHandler(1, 'unhandledRejection')); // Unhandled Promise
  process.on('SIGINT', exitHandler(0, 'SIGINT'));
  process.on('SIGQUIT', exitHandler(0, 'SIGQUIT'));
  process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
};
