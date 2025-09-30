import { useState } from 'react';

import type { ElementStatusProps, EssentialProps } from '@types';

import { Box } from '@layouts/Box';

import { Radio } from './Radio';
import { RadioGroupProvider } from './RadioGroup.context';

export type RadioGroupProps = EssentialProps<true> & {
  /** The radio buttons to be rendered in the group. */
  children: React.ReactElement<React.ComponentProps<typeof Radio>>[];
  /** The value of the currently selected radio button. */
  value?: string;
  /** The default value of the radio group. */
  defaultValue?: string;
  /** The name to be shared by all radio inputs in the group. */
  name?: string;
  /** Callback function when the value changes. */
  onChange?: (value: string) => void;
} & Pick<ElementStatusProps, 'isDisabled'>;

/**
 * A component that groups multiple Radio components.
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue="apple" onChange={console.log}>
 *   <Radio value="apple" label="Apple" />
 *   <Radio value="banana" label="Banana" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup = ({
  children,
  testId = 'radio-group',
  value,
  defaultValue = '',
  name = 'radio-group',
  onChange,
  isDisabled = false,
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const isControlled = typeof value !== 'undefined';
  const currentValue: string = isControlled ? value : selectedValue;

  const handleChange = (value: string) => {
    if (!isControlled) {
      setSelectedValue(value);
    }
    onChange?.(value);
  };

  return (
    <RadioGroupProvider
      value={{
        value: currentValue,
        onChange: handleChange,
        name,
        isDisabled,
      }}
    >
      <Box testId={testId} className="w-full space-y-2">
        {children}
      </Box>
    </RadioGroupProvider>
  );
};
