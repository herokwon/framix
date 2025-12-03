import type { ComponentPropsWithoutRef, ElementSize, LabelProps } from '@types';

import { cn } from '@utils';

import { ICON_SIZES } from '@data';

export type SpinnerProps = ComponentPropsWithoutRef<'span'> &
  LabelProps & {
    /** The positioning of the spinner. */
    position?: 'global' | 'local' | 'inline';
    /** The size of the spinner. */
    size?: ElementSize;
  };

/**
 * A component to indicate a loading state.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner position="global" />
 * <Spinner size="lg" />
 * ```
 */
export const Spinner = ({
  position = 'local',
  size = 'md',
  testId = 'spinner',
  label = 'Loading',
  ...props
}: SpinnerProps): React.JSX.Element => {
  return (
    <span
      {...props}
      data-testid={`${testId}-wrapper`}
      className={cn(
        props.className,
        'text-foreground-light dark:text-foreground-dark animate-spin-wrap',
        position !== 'inline' &&
          `${
            position === 'global' ? 'fixed' : 'absolute'
          } top-1/2 left-1/2 z-50 -translate-1/2`,
      )}
    >
      <svg
        width={ICON_SIZES[size]}
        height={ICON_SIZES[size]}
        className="animate-spin cursor-progress fill-none"
        viewBox="0 0 16 16"
        role="progressbar"
        focusable={false}
        aria-label={label}
        data-testid={testId}
      >
        <circle
          cx={8}
          cy={8}
          r={7}
          className="stroke-foreground-light dark:stroke-foreground-dark stroke-1"
          style={{
            strokeDasharray: 75,
          }}
        />
      </svg>
    </span>
  );
};
