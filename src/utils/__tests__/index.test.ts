import { describe, expect, it } from 'vitest';

import * as utilsIndex from '../index';

describe('utils/index.ts', () => {
  it('should export all expected utilities', () => {
    const exports = Object.keys(utilsIndex);

    expect(exports).toContain('cn');
    expect(exports).toContain('isLocalURL');
    expect(exports.length).toBe(2);
  });

  it('should re-export cn from cn module', async () => {
    const indexModule = await import('../index');
    const cnModule = await import('../cn');

    expect(indexModule.cn).toBe(cnModule.default);
    expect(indexModule.cn).toBeDefined();
    expect(typeof indexModule.cn).toBe('function');
  });

  it('should re-export isLocalURL from is-local-url module', async () => {
    const indexModule = await import('../index');
    const isLocalURLModule = await import('../is-local-url');

    expect(indexModule.isLocalURL).toBe(isLocalURLModule.default);
    expect(indexModule.isLocalURL).toBeDefined();
    expect(typeof indexModule.isLocalURL).toBe('function');
  });
});
