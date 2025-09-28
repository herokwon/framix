import * as clientModule from '../client';

describe('[Root] client.ts', () => {
  it('should export all modules', async () => {
    expect(clientModule).toBeDefined();
    expect(typeof clientModule).toBe('object');
  });

  it('should have correct export structure', async () => {
    const exports = Object.keys(clientModule);
    expect(exports.length).toBeGreaterThan(0);
  });
});
