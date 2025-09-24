import { useEffect, useState } from 'react';

import type {
  CheckableStatusProps,
  ComponentPropsWithRef,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { Grid } from '@layouts';

import { Text } from '@components/ui';

type RadioProps = StrictOmit<
  ComponentPropsWithRef<'input'>,
  'children' | 'type' | 'size' | 'checked'
> &
  StrictOmit<CheckableStatusProps, 'isLoading'>;

const Radio = ({
  testId = 'radio',
  label = '',
  isDisabled = false,
  isChecked: checked,
  onChange,
  defaultChecked = false,
  ...props
}: RadioProps) => {
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
        'group cursor-pointer auto-cols-[1fr] auto-rows-min',

        // status
        isDisabled && 'disabled',
      )}
    >
      <input
        {...props}
        tabIndex={0}
        type="radio"
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
      <span className="col-[1/2] row-[1/2]">
        <svg
          aria-hidden={true}
          focusable={false}
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <circle
            cx={12}
            cy={12}
            r={8}
            strokeWidth={1.5}
            className={cn(
              'stroke-foreground-light/38 group-hover:stroke-foreground-light dark:stroke-foreground-dark/38 dark:group-hover:stroke-foreground-dark fill-transparent transition-colors',

              isChecked && 'stroke-primary-light dark:stroke-primary-dark',
            )}
          />
          <circle
            cx={12}
            cy={12}
            r={4.5}
            className={cn(
              'fill-primary-light dark:fill-primary-dark transition-opacity',
              !isChecked && 'opacity-0',
            )}
          />
        </svg>
      </span>
      {label.length > 0 && (
        <Text className="col-[2/3] row-[1/2] my-auto w-full">{label}</Text>
      )}
    </Grid>
  );
};

export default Radio;
