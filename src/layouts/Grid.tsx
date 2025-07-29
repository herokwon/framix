import { camelCase } from 'es-toolkit';

import type {
  CSSValueToClassMap,
  PolymorphicPropsWithRef,
  StrictExtract,
} from '@types';

import { cn } from '@utils';

import { Box } from '@layouts';

type GridTemplateTypes =
  | {
      repeat: 'auto-fill' | 'auto-fit' | number;
      size?: string;
    }
  | [string, ...string[]];

type GridProps<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  {
    /** Grid template columns definition */
    templateColumns?: GridTemplateTypes;
    /** Grid template rows definition */
    templateRows?: GridTemplateTypes;
    /** Aligns grid along the inline (row) axis */
    justifyContent?: StrictExtract<
      React.CSSProperties['justifyContent'],
      | 'start'
      | 'center'
      | 'end'
      | 'space-around'
      | 'space-between'
      | 'space-evenly'
    >;
    /** Aligns grid along the block (column) axis */
    alignContent?: StrictExtract<
      React.CSSProperties['alignContent'],
      | 'start'
      | 'center'
      | 'end'
      | 'stretch'
      | 'space-around'
      | 'space-between'
      | 'space-evenly'
    >;
    /** Shorthand for align-items and justify-items */
    placeItems?: StrictExtract<
      React.CSSProperties['placeItems'],
      'start' | 'center' | 'end' | 'stretch' | 'baseline'
    >;
    /** Gap between grid items */
    gap?:
      | number
      | {
          row?: number;
          column?: number;
        };
  }
>;

const Grid = <T extends React.ElementType = 'div'>(
  props: GridProps<T>,
): React.ReactElement => {
  const {
    as: Component = 'div',
    templateColumns,
    templateRows,
    justifyContent = 'start',
    alignContent = 'start',
    placeItems = 'stretch',
    gap = 0,
    className,
    style,
    ...rest
  } = props;
  return (
    <Box
      {...rest}
      as={Component satisfies React.ElementType}
      style={{
        gridTemplateColumns: !templateColumns
          ? undefined
          : Array.isArray(templateColumns)
            ? templateColumns.join(' ')
            : `repeat(${templateColumns?.repeat}, ${templateColumns?.size ?? '1fr'})`,
        gridTemplateRows: !templateRows
          ? undefined
          : Array.isArray(templateRows)
            ? templateRows.join(' ')
            : `repeat(${templateRows?.repeat}, ${templateRows?.size ?? '1fr'})`,
        rowGap: `calc(var(--spacing) * ${typeof gap === 'number' ? gap : (gap.row ?? 0)})`,
        columnGap: `calc(var(--spacing) * ${typeof gap === 'number' ? gap : (gap.column ?? 0)})`,
        ...style,
      }}
      className={cn(
        className,
        'grid',
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
            start: 'content-start',
            center: 'content-center',
            end: 'content-end',
            stretch: 'content-stretch',
            spaceAround: 'content-around',
            spaceBetween: 'content-between',
            spaceEvenly: 'content-evenly',
          } satisfies CSSValueToClassMap<typeof alignContent>
        )[camelCase(alignContent)],
        (
          {
            start: 'place-items-start',
            center: 'place-items-center',
            end: 'place-items-end',
            stretch: 'place-items-stretch',
            baseline: 'place-items-baseline',
          } satisfies CSSValueToClassMap<typeof placeItems>
        )[camelCase(placeItems)],
      )}
    />
  );
};

export default Grid;
