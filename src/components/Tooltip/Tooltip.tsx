import React from 'react';

import type {
  ComponentPropsWithoutRef,
  ElementStatusProps,
  LabelProps,
  OverlayPosition,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { Box } from '@layouts/Box';

import { Text } from '../Text';

interface DescribableChild {
  'aria-describedby'?: string;
}

export type TooltipProps = StrictOmit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> &
  LabelProps &
  Pick<ElementStatusProps, 'isDisabled'> & {
    children: React.ReactElement;
    content: string;
    position?: OverlayPosition;
  };

export const Tooltip = ({
  children,
  position = 'bottom-center',
  content,
  isDisabled = false,
  testId = 'tooltip',
  label = 'Tooltip',
  ...props
}: TooltipProps): React.JSX.Element => {
  const id = `tooltip-${React.useId()}`;
  const trigger =
    !isDisabled && React.isValidElement<DescribableChild>(children)
      ? React.cloneElement(children, {
          'aria-describedby': [children.props['aria-describedby'], id]
            .filter(Boolean)
            .join(' '),
        })
      : children;

  return isDisabled ? (
    trigger
  ) : (
    <Box
      {...props}
      testId={`${testId}-wrapper`}
      label={`${label} wrapper`}
      className={cn(
        props.className,
        'relative hover:*:last:pointer-events-auto hover:*:last:opacity-100',
      )}
    >
      {trigger}
      <Box
        role="tooltip"
        testId={testId}
        label={label}
        id={id}
        className={cn(
          'pointer-events-none absolute z-10 grid w-max place-content-stretch opacity-0 transition-all',

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
          isColorInverted
          size="sm"
          className={cn(
            'bg-secondary-dark dark:bg-secondary-light w-max rounded px-2 py-1',
          )}
        >
          {content}
        </Text>
      </Box>
    </Box>
  );
};
