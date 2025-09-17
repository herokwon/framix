import { describe, expect, it } from 'vitest';

import cn from '../cn';

describe('cn utility function', () => {
  it('should merge basic classes', () => {
    const result = cn('text-red-500', 'bg-blue-500');

    expect(result).toBe('text-red-500 bg-blue-500');
  });

  it('should handle conditional classes', () => {
    const isVisible = true;
    const isHidden = false;
    const result = cn(
      'text-base',
      isVisible && 'font-bold',
      isHidden && 'hidden',
    );

    expect(result).toBe('text-base font-bold');
  });

  it('should merge conflicting Tailwind classes', () => {
    const result = cn('text-red-500', 'text-blue-500');

    expect(result).toBe('text-blue-500');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['text-sm', 'font-medium'], 'text-center');

    expect(result).toBe('text-sm font-medium text-center');
  });

  it('should handle objects with conditional classes', () => {
    const result = cn({
      'text-red-500': true,
      'bg-blue-500': false,
      'font-bold': true,
    });

    expect(result).toBe('text-red-500 font-bold');
  });

  it('should handle mixed input types', () => {
    const result = cn(
      'base-class',
      ['array-class-1', 'array-class-2'],
      {
        'object-class-true': true,
        'object-class-false': false,
      },
      'final-class',
    );

    expect(result).toBe(
      'base-class array-class-1 array-class-2 object-class-true final-class',
    );
  });

  it('should handle undefined and null values', () => {
    const result = cn('text-base', undefined, null, 'font-bold');

    expect(result).toBe('text-base font-bold');
  });

  it('should resolve Tailwind conflicts properly', () => {
    const result = cn('bg-red-200 px-2 py-1', 'bg-red-500 px-3');

    expect(result).toBe('py-1 bg-red-500 px-3');
  });

  it('should handle empty input', () => {
    expect(cn()).toBe('');
  });

  it('should handle whitespace and empty strings', () => {
    const result = cn('', ' ', 'text-base', ' ', 'font-bold');

    expect(result).toBe('text-base font-bold');
  });

  it('should preserve non-conflicting classes', () => {
    const result = cn(
      'text-red-500 hover:text-red-600',
      'bg-blue-500 hover:bg-blue-600',
      'text-blue-500',
    );

    expect(result).toBe(
      'hover:text-red-600 bg-blue-500 hover:bg-blue-600 text-blue-500',
    );
  });
});
