import type { LucideIcon } from 'lucide-react';

import type {
  ComponentPropsWithRef,
  ElementSize,
  ElementStatusProps,
  ElementVariant,
  StrictExclude,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { ICON_SIZES } from '@data';

import { Button } from './Button';

export type IconButtonProps = StrictOmit<
  ComponentPropsWithRef<'button'>,
  'children' | 'disabled'
> &
  Pick<Parameters<typeof Button>[0], 'color' | 'size' | 'shape'> &
  ElementStatusProps & {
    icon: LucideIcon;
    variant?: StrictExclude<ElementVariant, 'text'> | 'icon';
  };

export const IconButton = ({
  icon,
  variant = 'filled',
  color = 'default',
  size = 'md',
  shape = 'circle',
  testId = 'icon-button',
  label = 'Icon Button',
  ...props
}: IconButtonProps) => {
  const Icon = icon;

  return (
    <Button
      {...props}
      variant={variant === 'icon' ? 'text' : variant}
      color={color}
      size={size}
      shape={shape}
      testId={testId}
      label={label}
      className={cn(
        props.className,
        'p-0!',
        (
          {
            sm: 'w-6',
            md: 'w-8',
            lg: 'w-10',
          } satisfies Record<ElementSize, string>
        )[size],
      )}
    >
      <Icon
        role="img"
        aria-hidden={true}
        focusable={false}
        size={ICON_SIZES[size]}
      />
    </Button>
  );
};
