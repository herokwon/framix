import type {
  ElementColor,
  HeadingHtmlTag,
  PolymorphicPropsWithoutRef,
} from '@types';

import { cn } from '@utils';

import { Box } from '@layouts/Box';

import type { Text } from '../Text';

type TextAlign = NonNullable<Parameters<typeof Text>[0]['align']>;
export type HeadingProps<T extends HeadingHtmlTag> = PolymorphicPropsWithoutRef<
  T,
  true,
  {
    color?: ElementColor;
    align?: TextAlign;
  }
>;

export const Heading = <T extends HeadingHtmlTag = 'h1'>({
  as,
  children,
  color = 'default',
  align = 'left',
  testId = 'heading',
  ...props
}: HeadingProps<T>) => {
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
          } satisfies Record<TextAlign, string>
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
