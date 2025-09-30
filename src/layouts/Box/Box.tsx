import type { PolymorphicPropsWithRef } from '@types';

/**
 * A polymorphic box component that can render as any HTML element.
 *
 * @example
 * <Box>Default div</Box>
 * <Box as="button">Button</Box>
 * <Box as="a" href="https://example.com">Link</Box>
 */
export type BoxProps<T extends React.ElementType> = PolymorphicPropsWithRef<T>;

export const Box = <T extends React.ElementType = 'div'>(
  props: BoxProps<T>,
): React.ReactElement => {
  const { as: Component = 'div', testId, label, ...rest } = props;
  return <Component {...rest} data-testid={testId} aria-label={label} />;
};
