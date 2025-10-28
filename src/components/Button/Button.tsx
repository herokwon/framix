import type { LucideIcon } from 'lucide-react';

import type {
  ButtonHtmlTag,
  ComponentPropsWithRef,
  ElementColor,
  ElementSize,
  ElementStatusProps,
  ElementVariant,
  If,
  PolymorphicPropsWithRef,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { ICON_SIZES } from '@data';

import { Box } from '@layouts/Box';

import { Spinner } from '../Spinner';
import { Text } from '../Text';

export type ButtonProps<T extends ButtonHtmlTag> = PolymorphicPropsWithRef<
  T,
  false,
  If<
    T extends 'a' ? true : false,
    StrictOmit<ComponentPropsWithRef<'a'>, 'children'>,
    StrictOmit<ComponentPropsWithRef<'button'>, 'children' | 'disabled'>
  > &
    ElementStatusProps & {
      /** The content of the button. */
      children: NonNullable<React.ReactNode>;
      /** If true, the button will take up the full width of its container. */
      isFullWidth?: boolean;
      /** The visual style of the button. */
      variant?: ElementVariant;
      /** The color of the button. */
      color?: ElementColor;
      /** The size of the button. */
      size?: ElementSize;
      /** The shape of the button. */
      shape?: 'circle' | 'square';
      /** Icon to display on the left side of the button. */
      leftIcon?: LucideIcon;
      /** Icon to display on the right side of the button. */
      rightIcon?: LucideIcon;
    }
>;

/**
 * A clickable element used to trigger an action.
 *
 * @example
 * ```tsx
 * <Button>Click me</Button>
 * <Button color="primary" variant="outlined">Primary Button</Button>
 * <Button size="lg" leftIcon={Plus}>Add Item</Button>
 * ```
 */
export const Button = <T extends ButtonHtmlTag = 'button'>({
  children,
  as,
  variant = 'filled',
  color = 'default',
  size = 'md',
  shape = 'square',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  testId = 'button',
  label = 'Button',
  isFullWidth = false,
  isDisabled = false,
  isSelected = false,
  isLoading = false,
  ...props
}: ButtonProps<T>) => {
  const buttonTag = (as || 'button') satisfies ButtonHtmlTag;
  const hasOnlyOneIcon = !(
    (LeftIcon && RightIcon) ||
    (!LeftIcon && !RightIcon)
  );

  return (
    <Box
      {...props}
      type={
        buttonTag === 'a'
          ? undefined
          : ((props.type ??
              'button') as ComponentPropsWithRef<'button'>['type'])
      }
      disabled={buttonTag === 'a' ? undefined : isDisabled}
      as={buttonTag}
      role={buttonTag === 'a' ? 'button' : undefined}
      label={label}
      testId={testId}
      onClick={(e: React.MouseEvent<HTMLAnchorElement & HTMLButtonElement>) => {
        if (isDisabled || isLoading) {
          e.preventDefault();
          return;
        }

        props.onClick?.(e);
      }}
      className={cn(
        props.className,
        'flex cursor-pointer items-center justify-center whitespace-nowrap transition-all outline-none',

        // full width
        isFullWidth && 'w-full',

        // border
        variant === 'outlined' && 'border',

        // shape
        shape === 'circle' ? 'rounded-full' : 'rounded',

        // color
        (
          {
            filled: {
              default:
                'bg-secondary-light hover:not-disabled:bg-secondary-light-hover active:not-disabled:bg-secondary-light-active dark:bg-secondary-dark dark:hover:not-disabled:bg-secondary-dark-hover dark:active:not-disabled:bg-secondary-dark-active',
              primary:
                'bg-primary-light hover:not-disabled:bg-primary-light-hover active:not-disabled:bg-primary-light-active dark:bg-primary-dark dark:hover:not-disabled:bg-primary-dark-hover dark:active:not-disabled:bg-primary-dark-active',
              success:
                'bg-success-light hover:not-disabled:bg-success-light-hover active:not-disabled:bg-success-light-active dark:bg-success-dark dark:hover:not-disabled:bg-success-dark-hover dark:active:not-disabled:bg-success-dark-active',
              danger:
                'bg-danger-light hover:not-disabled:bg-danger-light-hover active:not-disabled:bg-danger-light-active dark:bg-danger-dark dark:hover:not-disabled:bg-danger-dark-hover dark:active:not-disabled:bg-danger-dark-active',
              warning:
                'bg-warning-light hover:not-disabled:bg-warning-light-hover active:not-disabled:bg-warning-light-active dark:bg-warning-dark dark:hover:not-disabled:bg-warning-dark-hover dark:active:not-disabled:bg-warning-dark-active',
              info: 'bg-info-light hover:not-disabled:bg-info-light-hover active:not-disabled:bg-info-light-active dark:bg-info-dark dark:hover:not-disabled:bg-info-dark-hover dark:active:not-disabled:bg-info-dark-active',
            },
            outlined: {
              default:
                'border-foreground-light/38 hover:not-disabled:border-foreground-light active:not-disabled:border-foreground-light active:not-disabled:bg-secondary-light dark:border-foreground-dark/38 dark:hover:not-disabled:border-foreground-dark dark:active:not-disabled:border-foreground-dark dark:active:not-disabled:bg-secondary-dark',
              primary:
                'border-primary-light/38 hover:not-disabled:border-primary-light active:not-disabled:border-primary-light active:not-disabled:bg-primary-background-light dark:border-primary-dark/38 dark:hover:not-disabled:border-primary-dark dark:active:not-disabled:border-primary-dark dark:active:not-disabled:bg-primary-background-dark',
              success:
                'border-success-light/38 hover:not-disabled:border-success-light active:not-disabled:border-success-light active:not-disabled:bg-success-background-light dark:border-success-dark/38 dark:hover:not-disabled:border-success-dark dark:active:not-disabled:border-success-dark dark:active:not-disabled:bg-success-background-dark',
              danger:
                'border-danger-light/38 hover:not-disabled:border-danger-light active:not-disabled:border-danger-light active:not-disabled:bg-danger-background-light dark:border-danger-dark/38 dark:hover:not-disabled:border-danger-dark dark:active:not-disabled:border-danger-dark dark:active:not-disabled:bg-danger-background-dark',
              warning:
                'border-warning-light/38 hover:not-disabled:border-warning-light active:not-disabled:border-warning-light active:not-disabled:bg-warning-background-light dark:border-warning-dark/38 dark:hover:not-disabled:border-warning-dark dark:active:not-disabled:border-warning-dark dark:active:not-disabled:bg-warning-background-dark',
              info: 'border-info-light/38 hover:not-disabled:border-info-light active:not-disabled:border-info-light active:not-disabled:bg-info-background-light dark:border-info-dark/38 dark:hover:not-disabled:border-info-dark dark:active:not-disabled:border-info-dark dark:active:not-disabled:bg-info-background-dark',
            },
            standard: {
              default:
                'hover:not-disabled:bg-secondary-light active:not-disabled:bg-secondary-light-hover dark:hover:not-disabled:bg-secondary-dark dark:active:not-disabled:bg-secondary-dark-hover',
              primary:
                'hover:not-disabled:bg-primary-background-light active:not-disabled:bg-primary-background-light-hover dark:hover:not-disabled:bg-primary-background-dark dark:active:not-disabled:bg-primary-background-dark-hover',
              success:
                'hover:not-disabled:bg-success-background-light active:not-disabled:bg-success-background-light-hover dark:hover:not-disabled:bg-success-background-dark dark:active:not-disabled:bg-success-background-dark-hover',
              danger:
                'hover:not-disabled:bg-danger-background-light active:not-disabled:bg-danger-background-light-hover dark:hover:not-disabled:bg-danger-background-dark dark:active:not-disabled:bg-danger-background-dark-hover',
              warning:
                'hover:not-disabled:bg-warning-background-light active:not-disabled:bg-warning-background-light-hover dark:hover:not-disabled:bg-warning-background-dark dark:active:not-disabled:bg-warning-background-dark-hover',
              info: 'hover:not-disabled:bg-info-background-light active:not-disabled:bg-info-background-light-hover dark:hover:not-disabled:bg-info-background-dark dark:active:not-disabled:bg-info-background-dark-hover',
            },
          } satisfies Record<ElementVariant, Record<ElementColor, string>>
        )[variant][color],

        // sizes
        (
          {
            sm: `h-6 gap-x-1.5 ${variant === 'outlined' ? 'px-2.75' : 'px-3'}`,
            md: `h-8 gap-x-2 ${variant === 'outlined' ? 'px-3.75' : 'px-4'}`,
            lg: `h-10 gap-x-2.5 ${variant === 'outlined' ? 'px-4.75' : 'px-5'}`,
          } satisfies Record<ElementSize, string>
        )[size],

        // status
        isDisabled && 'disabled',
        isSelected && 'active',
        isLoading && [
          'opacity-text-disabled pointer-events-none',
          variant === 'filled' && 'bg-secondary-light dark:bg-secondary-dark',
          variant === 'outlined' &&
            'border-foreground-light/38 dark:border-foreground-dark/38',
          !hasOnlyOneIcon &&
            'relative *:not-data-[testid="spinner-wrapper"]:opacity-0',
        ],
      )}
    >
      {isLoading && !hasOnlyOneIcon && <Spinner size={size} />}
      {LeftIcon &&
        (isLoading && hasOnlyOneIcon ? (
          <Spinner position="inline" size={size} />
        ) : (
          <LeftIcon
            role="img"
            aria-hidden={true}
            focusable={false}
            size={ICON_SIZES[size]}
          />
        ))}
      <Text
        color={variant === 'filled' ? 'default' : color}
        isColorInverted={
          variant === 'filled' && color !== 'default' && color !== 'warning'
        }
        size={size}
        weight={variant === 'filled' ? 'semibold' : 'medium'}
        className={cn(
          variant === 'filled' &&
            color === 'warning' &&
            'text-foreground-light!',
        )}
      >
        {children}
      </Text>
      {RightIcon &&
        (isLoading && hasOnlyOneIcon ? (
          <Spinner position="inline" size={size} />
        ) : (
          <RightIcon
            role="img"
            aria-hidden={true}
            focusable={false}
            size={ICON_SIZES[size]}
          />
        ))}
    </Box>
  );
};
