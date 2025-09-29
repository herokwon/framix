import type {
  ElementColor,
  ElementSize,
  PolymorphicPropsWithoutRef,
  StrictExtract,
  TextHtmlTag,
} from '@types';

import { cn } from '@utils';

import { Box } from '@layouts';

type TextAlign = StrictExtract<
  React.CSSProperties['textAlign'],
  'left' | 'center' | 'right'
>;
type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextProps<T extends TextHtmlTag> = PolymorphicPropsWithoutRef<
  T,
  true,
  {
    color?: ElementColor;
    isColorInverted?: boolean;
    size?: ElementSize;
    align?: TextAlign;
    weight?: FontWeight;
  }
>;

export const Text = <T extends TextHtmlTag = 'span'>({
  as,
  children,
  color = 'default',
  isColorInverted = false,
  size = 'md',
  align = 'left',
  weight = 'normal',
  testId = 'text',
  ...props
}: TextProps<T>) => {
  return (
    <Box
      {...props}
      as={(as ?? 'span') satisfies TextHtmlTag}
      testId={testId}
      className={cn(
        props.className,

        // color
        (
          (isColorInverted
            ? {
                default: 'text-foreground-dark dark:text-foreground-light',
                primary: 'text-primary-dark dark:text-primary-light',
                success: 'text-success-dark dark:text-success-light',
                danger: 'text-danger-dark dark:text-danger-light',
                warning: 'text-warning-dark dark:text-warning-light',
                info: 'text-info-dark dark:text-info-light',
              }
            : {
                default: 'text-foreground-light dark:text-foreground-dark',
                primary: 'text-primary-light dark:text-primary-dark',
                success: 'text-success-light dark:text-success-dark',
                danger: 'text-danger-light dark:text-danger-dark',
                warning: 'text-warning-light dark:text-warning-dark',
                info: 'text-info-light dark:text-info-dark',
              }) satisfies Record<ElementColor, string>
        )[color],

        // font size
        (
          {
            lg: 'text-body1',
            md: 'text-body2',
            sm: 'text-body3',
          } satisfies Record<ElementSize, string>
        )[size],

        // text alignment
        (
          {
            left: '',
            center: 'text-center',
            right: 'text-right',
          } satisfies Record<TextAlign, string>
        )[align],

        // font weight
        (
          {
            normal: '',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
          } satisfies Record<FontWeight, string>
        )[weight],
      )}
    >
      {children}
    </Box>
  );
};
