import { createContext, useContext } from 'react';

import type { ElementStatusProps } from '@types';

type RadioGroupContextProps = Required<
  Pick<ElementStatusProps, 'isDisabled'>
> & {
  value: string | undefined;
  onChange: (value: string) => void;
  name: string;
};

const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

export const RadioGroupProvider = RadioGroupContext.Provider;

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);

  if (!context) throw new Error('Radio must be used within a RadioGroup');
  return context;
};
