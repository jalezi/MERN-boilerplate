const { isNodeEnvTest } = require('.');

describe('', () => {
  test('is isJestUndefined defined and function', () => {
    expect(isNodeEnvTest).toBeDefined();
    expect(typeof isNodeEnvTest).toBe('function');
  });

  test('isNodeEnvTest should return falsy', () => {
    expect(isNodeEnvTest()).toBeFalsy();
  });

});
