import React from 'react';

import type {
  ComponentPropsWithoutRef,
  ElementStatusProps,
  OverlayPosition,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import Text from './Text';

type DescribableChild = {
  'aria-describedby'?: string;
};

type TooltipProps = StrictOmit<ComponentPropsWithoutRef<'div'>, 'children'> &
  Pick<ElementStatusProps, 'isDisabled'> &
  NonNullable<
    React.PropsWithChildren<{
      position?: OverlayPosition;
      content: string;
    }>
  >;

const Tooltip = ({
  children,
  position = 'bottom-center',
  content,
  isDisabled = false,
  ...props
}: TooltipProps) => {
  const id = `tooltip-${React.useId()}`;

  const trigger =
    !isDisabled && React.isValidElement<DescribableChild>(children)
      ? React.cloneElement(children as React.ReactElement<DescribableChild>, {
          'aria-describedby': [children.props['aria-describedby'], id]
            .filter(Boolean)
            .join(' '),
        })
      : children;

  return isDisabled ? (
    trigger
  ) : (
    <div
      {...props}
      className={cn(
        props.className,
        'relative hover:*:last:pointer-events-auto hover:*:last:opacity-100',
      )}
    >
      {trigger}
      <div
        className={cn(
          'absolute z-10 grid w-max place-content-stretch opacity-0 transition-all',

          // position
          position.startsWith('top')
            ? 'bottom-full'
            : position.startsWith('bottom')
              ? 'top-full'
              : position.startsWith('left')
                ? 'right-full'
                : 'left-full',
          position.endsWith('top')
            ? 'top-0'
            : position.endsWith('middle')
              ? 'top-1/2 -translate-y-1/2'
              : position.endsWith('bottom')
                ? 'bottom-0'
                : position.endsWith('left')
                  ? 'left-0'
                  : position.endsWith('center')
                    ? 'left-1/2 -translate-x-1/2'
                    : 'right-0',

          // padding
          (position.startsWith('top') || position.startsWith('bottom')) &&
            'py-1',
          (position.startsWith('left') || position.startsWith('right')) &&
            'px-1',
        )}
      >
        <Text
          id={id}
          size="sm"
          role="tooltip"
          className={cn(
            'text-foreground-dark! dark:text-foreground-light! bg-secondary-dark dark:bg-secondary-light w-max rounded px-2 py-1',
          )}
        >
          {content}
        </Text>
      </div>
    </div>
  );
};

export default Tooltip;
