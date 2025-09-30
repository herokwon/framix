import { useEffect, useState } from 'react';

import { SquareCheck } from 'lucide-react';

import type {
  CheckableStatusProps,
  ComponentPropsWithRef,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { Grid } from '@layouts/Grid';

import { Text } from '../Text';

export type CheckboxProps = StrictOmit<
  ComponentPropsWithRef<'input'>,
  'children' | 'type' | 'size' | 'checked'
> &
  StrictOmit<CheckableStatusProps, 'isLoading'> & {
    /** If true, the checkbox will be in an indeterminate state. */
    isIndeterminate?: boolean;
  };

/**
 * A control that allows the user to select one or more options.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" />
 * <Checkbox isIndeterminate />
 * <Checkbox isDisabled defaultChecked />
 * ```
 */
export const Checkbox = ({
  testId = 'checkbox',
  label = '',
  isDisabled = false,
  isChecked: checked,
  isIndeterminate,
  onChange,
  defaultChecked = false,
  ...props
}: CheckboxProps) => {
  const isControlled = typeof checked === 'boolean';

  const [isChecked, setIsChecked] = useState<boolean>(
    isControlled ? checked : defaultChecked,
  );

  useEffect(() => {
    if (isControlled) setIsChecked(checked);
  }, [isControlled, checked]);

  return (
    <Grid
      as="label"
      testId={`${testId}-wrapper`}
      templateColumns={['min-content', 'auto']}
      placeItems="center"
      gap={{ column: 1 }}
      className={cn(
        'cursor-pointer auto-cols-[1fr] auto-rows-min',

        // states
        isDisabled && 'disabled',
      )}
    >
      <input
        {...props}
        tabIndex={0}
        type="checkbox"
        data-testid={testId}
        checked={isChecked}
        disabled={isDisabled}
        onChange={e => {
          if (!isControlled) setIsChecked(e.target.checked);
          onChange?.(e);
        }}
        className={cn(
          props.className,
          'col-[1/2] row-[1/2] size-6 cursor-pointer appearance-none opacity-0',
        )}
      />
      <SquareCheck
        size={16}
        aria-hidden={true}
        focusable={false}
        className={cn(
          '*:not-first:stroke-foreground-dark dark:*:not-first:stroke-foreground-light col-[1/2] row-[1/2] m-auto flex items-center justify-center transition-colors *:not-first:-translate-1/4 *:not-first:scale-150 *:not-first:transition-opacity',

          // states
          isDisabled && 'disabled',
          isChecked &&
            'fill-primary-light dark:fill-primary-dark *:first:stroke-primary-light dark:*:first:stroke-primary-dark',
          ((isChecked && isIndeterminate) || !isChecked) &&
            '*:not-last:[path]:pointer-events-none *:not-last:[path]:opacity-0',
        )}
      >
        {typeof isIndeterminate !== 'undefined' && (
          <path d="M8 12h8" className={cn(!isIndeterminate && 'opacity-0')} />
        )}
      </SquareCheck>
      {label.length > 0 && (
        <Text className="col-[2/3] row-[1/2] my-auto w-full">{label}</Text>
      )}
    </Grid>
  );
};
