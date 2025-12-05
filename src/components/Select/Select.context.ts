import { createContext, useContext } from 'react';

import type { ElementStatusProps } from '@types';

export interface SelectIds {
  base: string;
  trigger: string;
  content: string;
}

type SelectContextValue = Required<Pick<ElementStatusProps, 'isDisabled'>> & {
  value: string;
  ids: SelectIds;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<SelectContextValue['open']>>;
  getContent: (value: string) => string;
  onChange: (value: string) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export const SelectProvider = SelectContext.Provider;

export const useSelect = (caller: string): SelectContextValue => {
  const context = useContext(SelectContext);

  if (!context) throw new Error(`${caller} must be used within a <Select>`);
  return context;
};
