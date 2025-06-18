import { describe, expect, it } from 'vitest';

import * as utilsIndex from '../index';

describe('utils/index.ts', () => {
  it('should export all expected utilities', () => {
    const exports = Object.keys(utilsIndex);

    expect(exports).toContain('cn');
    expect(exports.length).toBeGreaterThan(0);
  });

  it('should re-export cn from cn module', async () => {
    const indexModule = await import('../index');
    const cnModule = await import('../cn');

    expect(indexModule.cn).toBe(cnModule.default);
    expect(indexModule.cn).toBeDefined();
    expect(typeof indexModule.cn).toBe('function');
  });
});
