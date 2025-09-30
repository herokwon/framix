import { camelCase } from 'es-toolkit';

import type {
  CSSValueToClassMap,
  PolymorphicPropsWithRef,
  StrictExtract,
} from '@types';

import { cn } from '@utils';

import { Box } from '../Box';

export type FlexProps<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  false,
  {
    direction?: StrictExtract<
      React.CSSProperties['flexDirection'],
      'column' | 'column-reverse' | 'row' | 'row-reverse'
    >;
    justifyContent?: StrictExtract<
      React.CSSProperties['justifyContent'],
      | 'start'
      | 'center'
      | 'end'
      | 'space-around'
      | 'space-between'
      | 'space-evenly'
      | 'stretch'
    >;
    alignItems?: StrictExtract<
      React.CSSProperties['alignItems'],
      'start' | 'center' | 'end' | 'stretch' | 'baseline'
    >;
    wrap?: StrictExtract<
      React.CSSProperties['flexWrap'],
      'nowrap' | 'wrap' | 'wrap-reverse'
    >;
    gap?:
      | number
      | {
          row?: number;
          column?: number;
        };
    inline?: boolean;
  }
>;

/**
 * A flexible layout component that uses CSS Flexbox
 *
 * @example
 * ```tsx
 * // Basic flex container
 * <Flex>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * // Column layout with gap
 * <Flex direction="column" gap={{ row: 2, column: 1 }}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * // Centered content
 * <Flex justifyContent="center" alignItems="center">
 *   <div>Centered content</div>
 * </Flex>
 *
 * // As nav element
 * <Flex as="nav" justifyContent="space-between">
 *   <div>Logo</div>
 *   <div>Menu</div>
 * </Flex>
 * ```
 */
export const Flex = <T extends React.ElementType = 'div'>(
  props: FlexProps<T>,
): React.ReactElement => {
  const {
    as: Component = 'div',
    direction = 'row',
    justifyContent = 'start',
    alignItems = 'stretch',
    wrap = 'nowrap',
    gap = 0,
    inline = false,
    className,
    style,
    ...rest
  } = props;
  return (
    <Box
      {...rest}
      as={Component satisfies React.ElementType}
      style={{
        columnGap: `calc(var(--spacing) * ${typeof gap === 'number' ? gap : (gap.column ?? 0)})`,
        rowGap: `calc(var(--spacing) * ${typeof gap === 'number' ? gap : (gap.row ?? 0)})`,
        ...style,
      }}
      className={cn(
        className,
        inline ? 'inline-flex' : 'flex',
        (
          {
            row: 'flex-row',
            rowReverse: 'flex-row-reverse',
            column: 'flex-col',
            columnReverse: 'flex-col-reverse',
          } satisfies CSSValueToClassMap<typeof direction>
        )[camelCase(direction)],
        (
          {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            spaceAround: 'justify-around',
            spaceBetween: 'justify-between',
            spaceEvenly: 'justify-evenly',
            stretch: 'justify-stretch',
          } satisfies CSSValueToClassMap<typeof justifyContent>
        )[camelCase(justifyContent)],
        (
          {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            stretch: 'items-stretch',
            baseline: 'items-baseline',
          } satisfies CSSValueToClassMap<typeof alignItems>
        )[camelCase(alignItems)],
        (
          {
            nowrap: 'flex-nowrap',
            wrap: 'flex-wrap',
            wrapReverse: 'flex-wrap-reverse',
          } satisfies CSSValueToClassMap<typeof wrap>
        )[camelCase(wrap)],
      )}
    />
  );
};
