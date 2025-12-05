import * as clientModule from '../client';

describe('[Root] client.ts', () => {
  it('should export all modules', () => {
    expect(clientModule).toBeDefined();
    expect(typeof clientModule).toBe('object');
  });

  it('should have correct export structure', () => {
    const exports = Object.keys(clientModule);
    expect(exports.length).toBeGreaterThan(0);
  });
});
