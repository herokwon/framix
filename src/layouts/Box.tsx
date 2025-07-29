import type { PolymorphicPropsWithRef } from '@types';

/**
 * A polymorphic box component that can render as any HTML element.
 *
 * @example
 * <Box>Default div</Box>
 * <Box as="button">Button</Box>
 * <Box as="a" href="https://example.com">Link</Box>
 */
const Box = <T extends React.ElementType = 'div'>(
  props: PolymorphicPropsWithRef<T>,
): React.ReactElement => {
  const { as: Component = 'div', ...rest } = props;
  return <Component {...rest} />;
};

export default Box;
