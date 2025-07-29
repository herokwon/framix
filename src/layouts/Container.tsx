import type {
  ElementSize,
  PolymorphicPropsWithRef,
  StrictExtract,
} from '@types';

import { cn } from '@utils';

import { Box } from '@layouts';

type ContainerTags = StrictExtract<
  React.ElementType,
  | 'main'
  | 'section'
  | 'div'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'dialog'
>;
type ContainerProps<T extends ContainerTags> = PolymorphicPropsWithRef<
  T,
  | {
      fixed: true;
    }
  | {
      fixed?: false;
      maxWidth?: ElementSize;
    }
>;

const Container = <T extends ContainerTags = 'section'>(
  props: ContainerProps<T>,
): React.ReactElement => {
  const { as: Component = 'section', className, ...rest } = props;
  return (
    <Box
      {...Object.fromEntries(
        Object.entries(rest).filter(
          ([key]) => key !== 'fixed' && key !== 'maxWidth',
        ),
      )}
      as={Component satisfies ContainerTags}
      className={cn(
        className,
        props.fixed
          ? 'container'
          : !props.maxWidth
            ? 'w-full'
            : (
                {
                  sm: 'sm:max-w-[40rem]',
                  md: 'md:max-w-3xl',
                  lg: 'lg:max-w-5xl',
                  xl: 'xl:max-w-7xl',
                } satisfies { [width in typeof props.maxWidth]: string }
              )[props.maxWidth],
      )}
    />
  );
};

export default Container;
