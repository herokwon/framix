import type { CamelCase } from '@types';

/**
 * Maps CSS property values to CSS class names (typically Tailwind classes)
 * Converts kebab-case or space-separated values to camelCase keys
 *
 * @template T - Union type of CSS property values
 *
 * @example
 * type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
 * type FlexDirectionClassMap = CSSValueToClassMap<FlexDirection>;
 * // Result: { row: string; rowReverse: string; column: string; columnReverse: string; }
 *
 * const directionClasses: FlexDirectionClassMap = {
 *   row: 'flex-row',
 *   rowReverse: 'flex-row-reverse',
 *   column: 'flex-col',
 *   columnReverse: 'flex-col-reverse',
 * };
 */
export type CSSValueToClassMap<T extends string> = {
  [value in CamelCase<T>]: string;
};
