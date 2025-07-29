import { camelCase } from 'es-toolkit';

import type {
  CSSValueToClassMap,
  PolymorphicPropsWithRef,
  StrictExtract,
} from '@types';

import { cn } from '@utils';

import { Box } from '@layouts';

type FlexProps<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
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

const Flex = <T extends React.ElementType = 'div'>(props: FlexProps<T>) => {
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

export default Flex;
