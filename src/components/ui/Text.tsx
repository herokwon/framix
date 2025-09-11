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
type TextProps<T extends TextHtmlTag> = PolymorphicPropsWithoutRef<
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

const Text = <T extends TextHtmlTag = 'span'>({
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
          {
            default: isColorInverted
              ? 'text-foreground-dark dark:text-foreground-light'
              : 'text-foreground-light dark:text-foreground-dark',
            primary: isColorInverted
              ? 'text-primary-dark dark:text-primary-light'
              : 'text-primary-light dark:text-primary-dark',
            success: isColorInverted
              ? 'text-success-dark dark:text-success-light'
              : 'text-success-light dark:text-success-dark',
            danger: isColorInverted
              ? 'text-danger-dark dark:text-danger-light'
              : 'text-danger-light dark:text-danger-dark',
            warning: isColorInverted
              ? 'text-warning-dark dark:text-warning-light'
              : 'text-warning-light dark:text-warning-dark',
            info: isColorInverted
              ? 'text-info-dark dark:text-info-light'
              : 'text-info-light dark:text-info-dark',
          } satisfies Record<ElementColor, string>
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

export default Text;
