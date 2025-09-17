import { afterEach, describe, expect, it, vi } from 'vitest';

import isLocalURL from '../is-local-url';

const baseOrigin = 'https://example.com';

describe('isLocalURL utility', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('treats relative, hash-only and query-only URLs as local', () => {
    expect(isLocalURL({ url: '/about' })).toBe(true);
    expect(isLocalURL({ url: 'about' })).toBe(true);
    expect(isLocalURL({ url: './rel' })).toBe(true);
    expect(isLocalURL({ url: '../up' })).toBe(true);
    expect(isLocalURL({ url: '#section' })).toBe(true);
    expect(isLocalURL({ url: '?q=1' })).toBe(true);
    expect(isLocalURL({ url: '/path?foo=bar#hash' })).toBe(true);
  });

  it('returns true for absolute URLs that match the provided baseOrigin', () => {
    expect(
      isLocalURL({ url: 'https://example.com/path', options: { baseOrigin } }),
    ).toBe(true);
    expect(
      isLocalURL({ url: 'http://example.com/', options: { baseOrigin } }),
    ).toBe(false);
  });

  it('returns false for absolute URLs with a different origin', () => {
    expect(
      isLocalURL({ url: 'https://other.com/path', options: { baseOrigin } }),
    ).toBe(false);
    expect(
      isLocalURL({ url: 'https://sub.example.com/', options: { baseOrigin } }),
    ).toBe(false);
  });

  it('handles protocol-relative URLs (//host) correctly', () => {
    expect(
      isLocalURL({ url: '//example.com/assets', options: { baseOrigin } }),
    ).toBe(true);
    expect(
      isLocalURL({ url: '//cdn.example.com', options: { baseOrigin } }),
    ).toBe(false);
  });

  it('treats non-http(s) schemes like mailto: and tel: as local so the browser handles them', () => {
    expect(isLocalURL({ url: 'mailto:test@example.com' })).toBe(true);
    expect(isLocalURL({ url: 'tel:+1234567890' })).toBe(true);
    expect(isLocalURL({ url: 'data:text/plain;base64,SGVsbG8=' })).toBe(true);
  });

  it('rejects dangerous schemes like javascript:', () => {
    expect(isLocalURL({ url: 'javascript:alert(1)' })).toBe(false);
    expect(isLocalURL({ url: '  JAVASCRIPT:alert(1)' })).toBe(false);
  });

  it('returns false for invalid absolute URLs (parsing failure)', () => {
    expect(
      isLocalURL({ url: 'https://exa mple.com', options: { baseOrigin } }),
    ).toBe(false);
  });

  it('in SSR (no window) without baseOrigin, absolute URLs are treated as external', () => {
    vi.stubGlobal('window', undefined as unknown as Window);
    expect(isLocalURL({ url: 'https://example.com' })).toBe(false);
  });
});
