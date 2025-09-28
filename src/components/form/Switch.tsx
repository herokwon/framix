import { useState } from 'react';

import type {
  CheckableStatusProps,
  ComponentPropsWithRef,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { Flex } from '@layouts';

type SwitchProps = StrictOmit<
  ComponentPropsWithRef<'button'>,
  'children' | 'onChange'
> &
  StrictOmit<CheckableStatusProps, 'isLoading'> & {
    defaultChecked?: boolean;
    hasShadow?: boolean;
    onChange?: (checked: boolean) => void;
  };

const Switch = ({
  testId = 'switch',
  label = 'Switch',
  isDisabled = false,
  isChecked: checked,
  defaultChecked = false,
  hasShadow = true,
  onChange,
  ...props
}: SwitchProps) => {
  const [internalChecked, setInternalChecked] =
    useState<boolean>(defaultChecked);

  const isControlled = typeof checked !== 'undefined';
  const isChecked: boolean = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (isDisabled) return;

    if (!isControlled) {
      setInternalChecked(!isChecked);
    }
    onChange?.(!isChecked);
  };

  return (
    <Flex
      {...props}
      as="button"
      type="button"
      role="switch"
      testId={testId}
      label={label}
      disabled={isDisabled}
      aria-checked={isChecked}
      onClick={handleClick}
      className={cn(
        props.className,
        'relative aspect-[3/1] w-9 rounded-full p-0.5 transition-colors not-disabled:cursor-pointer',

        // status
        isDisabled && 'disabled',

        // background color
        isChecked
          ? 'bg-primary-light hover:not-disabled:bg-primary-light-hover dark:bg-primary-dark dark:hover:not-disabled:bg-primary-dark-hover'
          : 'bg-secondary-dark-active hover:not-disabled:bg-secondary-dark-hover dark:bg-secondary-light-active dark:hover:not-disabled:bg-secondary-light-hover',

        // shadow
        hasShadow && [
          'shadow-inner',
          isChecked
            ? 'shadow-primary-light-active!'
            : 'shadow-background-dark! dark:shadow-secondary-dark!',
        ],
      )}
    >
      <svg
        width={14}
        height={14}
        className={cn(
          'relative transition-transform',

          // checked
          isChecked && 'translate-x-[calc((18/14)*100%)]',
        )}
      >
        <circle
          cx={7}
          cy={7}
          r={7}
          className="dark:fill-background-dark fill-background-light"
        />
      </svg>
    </Flex>
  );
};

export default Switch;
