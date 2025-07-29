import type { PolymorphicPropsWithRef } from '@types';

const Box = <T extends React.ElementType = 'div'>(
  props: PolymorphicPropsWithRef<T>,
): React.ReactElement => {
  const { as: Component = 'div', ...rest } = props;
  return <Component {...rest} />;
};

export default Box;
