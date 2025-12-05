import type { LucideIcon } from 'lucide-react';

import type { ElementSize, StrictOmit } from '@types';

import { cn } from '@utils';

import { ICON_SIZES } from '@data';

import { Button } from './Button';

export type IconButtonProps = StrictOmit<
  React.ComponentProps<typeof Button<'button'>>,
  'as' | 'children'
> & {
  /** The icon to be displayed in the button. */
  icon: LucideIcon;
};

/**
 * A button that contains only an icon.
 *
 * @example
 * ```tsx
 * <IconButton icon={Search} />
 * <IconButton icon={X} size="sm" />
 * ```
 */
export const IconButton = ({
  icon: Icon,
  size = 'md',
  shape = 'circle',
  testId = 'icon-button',
  label = 'Icon Button',
  ...props
}: IconButtonProps): React.JSX.Element => {
  return (
    <Button
      {...props}
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
