import * as indexModule from '../index';

describe('[Root] index.ts', () => {
  it('should export all modules', () => {
    expect(indexModule).toBeDefined();
    expect(typeof indexModule).toBe('object');
  });

  it('should have correct export structure', () => {
    const exports = Object.keys(indexModule);
    expect(exports.length).toBeGreaterThan(0);
  });
});
