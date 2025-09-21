import { describe, expect, it } from 'vitest';

describe('[Root] client.ts', () => {
  it('should export client-only components', async () => {
    const clientModule = await import('../client');
    const exports = Object.keys(clientModule);

    expect(clientModule).toBeDefined();
    expect(typeof clientModule).toBe('object');

    expect(exports.length).toBeGreaterThan(0);
    expect(exports).toContain('Button');
    expect(exports).toContain('LinkButton');
  });

  it('should re-export Button and LinkButton correctly', async () => {
    const clientModule = await import('../client');
    const ButtonModule = await import('../components/ui/Button');
    const LinkButtonModule = await import('../components/ui/LinkButton');

    expect(clientModule.Button).toBe(ButtonModule.default);
    expect(typeof clientModule.Button).toBe('function');

    expect(clientModule.LinkButton).toBe(LinkButtonModule.default);
    expect(typeof clientModule.LinkButton).toBe('function');
  });
});
