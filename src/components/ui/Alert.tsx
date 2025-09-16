import {
  CircleAlert,
  CircleCheck,
  Info,
  type LucideIcon,
  TriangleAlert,
} from 'lucide-react';

import type {
  ComponentPropsWithoutRef,
  ElementColor,
  ElementVariant,
  StrictExclude,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { ICON_SIZES } from '@data';

import { Flex } from '@layouts';

import Text from './Text';

type AlertColor = StrictExclude<ElementColor, 'primary'>;
type AlertProps = StrictOmit<ComponentPropsWithoutRef<'div'>, 'children'> &
  NonNullable<
    React.PropsWithChildren<{
      variant?: ElementVariant;
      color?: AlertColor;
    }>
  >;

const Alert = ({
  children,
  variant = 'text',
  color = 'default',
  ...props
}: AlertProps) => {
  const AlertIcon = (
    {
      default: Info,
      success: CircleCheck,
      danger: CircleAlert,
      warning: TriangleAlert,
      info: Info,
    } satisfies Record<AlertColor, LucideIcon>
  )[color];

  return (
    <Flex
      {...props}
      role="alert"
      gap={{
        column: 4,
      }}
      className={cn(
        props.className,
        'rounded',

        // padding
        variant === 'outlined' ? 'px-3.75 py-1.75' : 'px-4 py-2',

        // background color
        (variant === 'filled'
          ? ({
              default: 'bg-secondary-light dark:bg-secondary-dark',
              success: 'bg-success-light dark:bg-success-dark',
              danger: 'bg-danger-light dark:bg-danger-dark',
              warning: 'bg-warning-light dark:bg-warning-dark',
              info: 'bg-info-light dark:bg-info-dark',
            } satisfies Record<AlertColor, string>)
          : {
              default: 'bg-secondary-light dark:bg-secondary-dark',
              success:
                'bg-success-background-light dark:bg-success-background-dark',
              danger:
                'bg-danger-background-light dark:bg-danger-background-dark',
              warning:
                'bg-warning-background-light dark:bg-warning-background-dark',
              info: 'bg-info-background-light dark:bg-info-background-dark',
            })[color],

        // outlined
        variant === 'outlined' &&
          `border ${
            (
              {
                default: 'border-foreground-light dark:border-foreground-dark',
                success: 'border-success-light dark:border-success-dark',
                danger: 'border-danger-light dark:border-danger-dark',
                warning: 'border-warning-light dark:border-warning-dark',
                info: 'border-info-light dark:border-info-dark',
              } satisfies Record<AlertColor, string>
            )[color]
          }`,
      )}
    >
      <AlertIcon
        role="img"
        size={ICON_SIZES.sm}
        focusable={false}
        aria-hidden={true}
        className={cn(
          variant === 'filled'
            ? color === 'default' || color === 'warning'
              ? 'text-foreground-light dark:text-foreground-dark'
              : 'text-foreground-dark dark:text-foreground-light'
            : (
                {
                  default: 'text-foreground-light dark:text-foreground-dark',
                  success: 'text-success-light dark:text-success-dark',
                  danger: 'text-danger-light dark:text-danger-dark',
                  warning: 'text-warning-light dark:text-warning-dark',
                  info: 'text-info-light dark:text-info-dark',
                } satisfies Record<AlertColor, string>
              )[color],
        )}
      />
      <Text
        color={variant === 'filled' ? 'default' : color}
        isColorInverted={
          variant === 'filled' && color !== 'default' && color !== 'warning'
        }
        weight={variant === 'filled' ? 'semibold' : 'normal'}
        className={cn(
          variant === 'filled' &&
            color === 'warning' &&
            'text-foreground-light!',
        )}
      >
        {children}
      </Text>
    </Flex>
  );
};

export default Alert;
