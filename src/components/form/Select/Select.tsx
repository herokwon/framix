import { useEffect, useId, useMemo, useRef, useState } from 'react';

import type {
  ComponentPropsWithoutRef,
  ElementStatusProps,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { Box } from '@layouts';

import { type SelectIds, SelectProvider } from './Select.context';
import SelectContent from './SelectContent';
import SelectTrigger from './SelectTrigger';

type SelectProps = StrictOmit<
  ComponentPropsWithoutRef<'div', true>,
  'defaultValue' | 'onChange'
> &
  Pick<ElementStatusProps, 'isDisabled'> & {
    children?:
      | React.ReactElement<typeof SelectTrigger>
      | React.ReactElement<typeof SelectContent>[];
    value?: string;
    defaultValue?: string;
    getContent?: (value: string) => string;
    onChange?: (value: string) => void;
  };

const defaultGetContent = (value: string) => value;

const Select = ({
  children,
  testId = 'select',
  value,
  defaultValue = '',
  getContent = defaultGetContent,
  onChange,
  isDisabled = false,
  ...props
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const [open, setOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const reactId = useId();

  const base = props.id ?? `select-${reactId.replace(/:/g, '')}`;
  const ids: SelectIds = useMemo(
    () => ({
      base,
      trigger: `${base}-trigger`,
      content: `${base}-content`,
    }),
    [base],
  );

  const isControlled = typeof value !== 'undefined';
  const selectedValue = isControlled ? value : internalValue;

  const handleChange = (value: string) => {
    if (isDisabled) return;

    if (!isControlled) {
      setInternalValue(value);
    }

    onChange?.(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        open &&
        e.target instanceof Node &&
        selectRef.current &&
        !selectRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  return (
    <SelectProvider
      value={{
        isDisabled,
        value: selectedValue,
        ids,
        open,
        setOpen,
        getContent,
        onChange: handleChange,
      }}
    >
      <Box
        {...props}
        ref={selectRef}
        testId={testId}
        className={cn(
          props.className,
          'relative **:[label]:group-has-[input:focus]:pointer-events-none',
        )}
      >
        {children}
      </Box>
    </SelectProvider>
  );
};

export default Select;
