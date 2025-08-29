import type { LucideIcon } from 'lucide-react';

import type {
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

import { Box } from '@layouts';

import Spinner from './Spinner';

type ButtonElement = 'button' | 'a';

type ButtonProps<T extends ButtonElement> = PolymorphicPropsWithRef<
  T,
  If<
    T extends 'a' ? true : false,
    StrictOmit<ComponentPropsWithRef<'a'>, 'children'>,
    StrictOmit<ComponentPropsWithRef<'button'>, 'children' | 'disabled'>
  > &
    ElementStatusProps & {
      children: NonNullable<React.ReactNode>;
      variant?: ElementVariant;
      color?: ElementColor;
      size?: ElementSize;
      shape?: 'circle' | 'square';
      leftIcon?: LucideIcon;
      rightIcon?: LucideIcon;
    }
>;

const Button = <T extends ButtonElement = 'button'>({
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
  isDisabled = false,
  isSelected = false,
  isLoading = false,
  ...props
}: ButtonProps<T>) => {
  const hasOnlyOneIcon = !(
    (LeftIcon && RightIcon) ||
    (!LeftIcon && !RightIcon)
  );

  return (
    <Box
      {...props}
      type={
        as === 'a'
          ? undefined
          : ((props.type ??
              'button') as ComponentPropsWithRef<'button'>['type'])
      }
      disabled={as === 'a' ? undefined : isDisabled}
      as={(as || 'button') satisfies ButtonElement}
      role={as === 'button' ? undefined : 'button'}
      aria-label={label}
      data-testid={testId}
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

        // shape
        shape === 'circle' ? 'rounded-full' : 'rounded',

        // variant & color
        (
          {
            filled: `${
              color === 'warning'
                ? 'text-foreground-light'
                : color === 'default'
                  ? 'text-foreground-light dark:text-foreground-dark'
                  : 'text-foreground-dark dark:text-foreground-light'
            } ${
              (
                {
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
                } satisfies Record<ElementColor, string>
              )[color]
            }`,
            outlined: `border ${
              (
                {
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
                } satisfies Record<ElementColor, string>
              )[color]
            }`,
            text: (
              {
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
              } satisfies Record<ElementColor, string>
            )[color],
          } satisfies Record<ElementVariant, string>
        )[variant],
        isLoading
          ? [
              'text-foreground-light dark:text-foreground-dark',
              variant === 'filled' &&
                'bg-secondary-light dark:bg-secondary-dark',
              variant === 'outlined' &&
                'border-foreground-light/38 dark:border-foreground-dark/38',
            ]
          : variant !== 'filled' &&
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

        // sizes
        (
          {
            sm: `h-6 gap-x-1.5 ${variant === 'outlined' ? 'px-2.75' : 'px-3'}`,
            md: `h-8 gap-x-2 ${variant === 'outlined' ? 'px-3.75' : 'px-4'}`,
            lg: `h-10 gap-x-2.5 ${variant === 'outlined' ? 'px-4.75' : 'px-5'}`,
          } satisfies Record<ElementSize, string>
        )[size],

        // states
        isDisabled && 'disabled',
        isSelected && 'active',
        isLoading &&
          `opacity-text-disabled pointer-events-none ${cn(
            !hasOnlyOneIcon &&
              'relative *:not-[[data-testid="spinner-wrapper"]]:opacity-0',
          )}`,
      )}
    >
      {isLoading && !hasOnlyOneIcon && <Spinner size={size} />}
      {LeftIcon &&
        (isLoading && hasOnlyOneIcon ? (
          <Spinner position="inline" size={size} />
        ) : (
          <LeftIcon size={ICON_SIZES[size]} />
        ))}
      <span className="text-body2 font-medium">{children}</span>
      {RightIcon &&
        (isLoading && hasOnlyOneIcon ? (
          <Spinner position="inline" size={size} />
        ) : (
          <RightIcon size={ICON_SIZES[size]} />
        ))}
    </Box>
  );
};

export default Button;
