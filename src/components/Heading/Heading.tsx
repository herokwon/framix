import type {
  ElementColor,
  HeadingHtmlTag,
  HorizontalAlignment,
  PolymorphicPropsWithoutRef,
} from '@types';

import { cn } from '@utils';

import { Box } from '@layouts/Box';

export type HeadingProps<T extends HeadingHtmlTag> = PolymorphicPropsWithoutRef<
  T,
  {
    /** The color of the heading. */
    color?: ElementColor;
    /** The text alignment of the heading. */
    align?: HorizontalAlignment;
  }
>;

/**
 * A component for rendering semantic heading elements.
 *
 * @example
 * ```tsx
 * <Heading as="h1">This is a main heading</Heading>
 * <Heading as="h2" color="primary">This is a subheading</Heading>
 * ```
 */
export const Heading = <T extends HeadingHtmlTag = 'h1'>({
  as,
  children,
  color = 'default',
  align = 'left',
  testId = 'heading',
  ...props
}: HeadingProps<T>): React.JSX.Element => {
  const headingTag = (as ?? 'h1') satisfies HeadingHtmlTag;
  return (
    <Box
      {...props}
      as={headingTag}
      testId={testId}
      className={cn(
        props.className,

        // color
        (
          {
            default: 'text-foreground-light dark:text-foreground-dark',
            primary: 'text-primary-light dark:text-primary-dark',
            success: 'text-success-light dark:text-success-dark',
            danger: 'text-danger-light dark:text-danger-dark',
            warning: 'text-warning-light dark:text-warning-dark',
            info: 'text-info-light dark:text-info-dark',
          } satisfies Record<ElementColor, string>
        )[color],

        // text alignment
        (
          {
            left: '',
            center: 'text-center',
            right: 'text-right',
          } satisfies Record<HorizontalAlignment, string>
        )[align],

        // font style
        (
          {
            h1: 'text-heading1 font-extrabold',
            h2: 'text-heading2 font-bold',
            h3: 'text-title1 font-semibold',
            h4: 'text-title2 font-semibold',
          } satisfies Record<HeadingHtmlTag, string>
        )[headingTag],
      )}
    >
      {children}
    </Box>
  );
};
