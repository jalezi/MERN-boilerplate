const { isNotNodeEnvTest, exitEvents, addListenersToProcess } = require('.');

describe('Testing isNotNodeEnvTes', () => {
  test('isNotNodeEnvTes defined and function', () => {
    expect(isNotNodeEnvTest).toBeDefined();
    expect(typeof isNotNodeEnvTest).toBe('function');
  });

  test('isNotNodeEnvTest should return falsy', () => {
    expect(isNotNodeEnvTest()).toBeFalsy();
  });
});

describe('Testing exitEvents Object', () => {
  it('should be defined, instance of object and frozen ', () => {
    expect(exitEvents).toBeDefined();
    expect(exitEvents).toBeInstanceOf(Object);
    expect(Object.isFrozen(exitEvents)).toBeTruthy();
  });
});

describe('Testing addListenersToProcess', () => {
  test('somethin something', () => {
    const exitHandler = () => () => {};
    addListenersToProcess(exitHandler);
  });
});
