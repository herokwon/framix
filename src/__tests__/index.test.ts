describe('[Root] index.ts', () => {
  it('should export all modules', async () => {
    const indexModule = await import('../index');

    expect(indexModule).toBeDefined();
    expect(typeof indexModule).toBe('object');
  });

  it('should have correct export structure', async () => {
    const indexModule = await import('../index');
    const exports = Object.keys(indexModule);

    expect(exports.length).toBeGreaterThan(0);
  });
});
