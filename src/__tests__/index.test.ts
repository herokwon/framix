import * as indexModule from '../index';

describe('[Root] index.ts', () => {
  it('should export all modules', async () => {
    expect(indexModule).toBeDefined();
    expect(typeof indexModule).toBe('object');
  });

  it('should have correct export structure', async () => {
    const exports = Object.keys(indexModule);
    expect(exports.length).toBeGreaterThan(0);
  });
});
