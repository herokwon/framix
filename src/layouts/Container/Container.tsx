import type { MaxWidth, PolymorphicPropsWithRef, StrictExtract } from '@types';

import { cn } from '@utils';

import { Box } from '../Box';

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
export type ContainerProps<T extends ContainerTags> = PolymorphicPropsWithRef<
  T,
  false,
  | {
      /** If true, the container will have a fixed width based on Tailwind's container class. */
      fixed: true;
    }
  | {
      /** If false or undefined, the container will be responsive. */
      fixed?: false;
      /** Sets the maximum width of the container. This is only applied when `fixed` is not true. */
      maxWidth?: MaxWidth;
    }
>;

/**
 * A semantic container component with responsive width controls
 *
 * @example
 * ```tsx
 * // Default container with full width
 * <Container>Content</Container>
 *
 * // Fixed container using Tailwind's container class
 * <Container fixed>Content</Container>
 *
 * // Custom max-width container
 * <Container maxWidth="lg">Content</Container>
 *
 * // As main element
 * <Container as="main" maxWidth="xl">Main content</Container>
 * ```
 */
export const Container = <T extends ContainerTags = 'section'>(
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
