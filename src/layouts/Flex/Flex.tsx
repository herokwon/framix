import type {
  ContentAlignment,
  ItemsAlignment,
  PolymorphicPropsWithRef,
  StrictExtract,
} from '@types';

import { cn } from '@utils';

import { Box } from '../Box';

type FlexDirection = StrictExtract<
  React.CSSProperties['flexDirection'],
  'column' | 'column-reverse' | 'row' | 'row-reverse'
>;
type FlexWrap = StrictExtract<
  React.CSSProperties['flexWrap'],
  'nowrap' | 'wrap' | 'wrap-reverse'
>;
export type FlexProps<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  false,
  {
    /** The direction of the flex items */
    direction?: FlexDirection;
    /** Aligns flex items along the main axis */
    justifyContent?: ContentAlignment;
    /** Aligns flex items along the cross axis */
    alignItems?: ItemsAlignment;
    /** Whether flex items should wrap */
    wrap?: FlexWrap;
    /** The gap between flex items */
    gap?:
      | number
      | {
          row?: number;
          column?: number;
        };
    /** If true, the component will be an inline-flex container */
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
            row: '',
            'row-reverse': 'flex-row-reverse',
            column: 'flex-col',
            'column-reverse': 'flex-col-reverse',
          } satisfies Record<FlexDirection, string>
        )[direction],
        (
          {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            'space-around': 'justify-around',
            'space-between': 'justify-between',
            'space-evenly': 'justify-evenly',
            stretch: 'justify-stretch',
          } satisfies Record<ContentAlignment, string>
        )[justifyContent],
        (
          {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            stretch: 'items-stretch',
            baseline: 'items-baseline',
          } satisfies Record<ItemsAlignment, string>
        )[alignItems],
        (
          {
            nowrap: 'flex-nowrap',
            wrap: 'flex-wrap',
            'wrap-reverse': 'flex-wrap-reverse',
          } satisfies Record<FlexWrap, string>
        )[wrap],
      )}
    />
  );
};
