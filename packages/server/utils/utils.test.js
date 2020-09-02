const { isNotNodeEnvTest } = require('.');

describe('', () => {
  test('is isJestUndefined defined and function', () => {
    expect(isNotNodeEnvTest).toBeDefined();
    expect(typeof isNotNodeEnvTest).toBe('function');
  });

  test('isNodeEnvTest should return falsy', () => {
    expect(isNotNodeEnvTest()).toBeFalsy();
  });
});
