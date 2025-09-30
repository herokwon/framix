import { useState } from 'react';

import type { ElementStatusProps, EssentialProps } from '@types';

import { Box } from '@layouts/Box';

import { Radio } from './Radio';
import { RadioGroupProvider } from './RadioGroup.context';

export type RadioGroupProps = EssentialProps<true> & {
  children: React.ReactElement<React.ComponentProps<typeof Radio>>[];
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: (value: string) => void;
} & Pick<ElementStatusProps, 'isDisabled'>;

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
