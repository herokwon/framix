import { useEffect, useId, useMemo, useRef, useState } from 'react';

import type {
  ComponentPropsWithoutRef,
  ElementStatusProps,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { Box } from '@layouts/Box';

import { type SelectIds, SelectProvider } from './Select.context';
import type { SelectContent } from './SelectContent';
import type { SelectTrigger } from './SelectTrigger';

export type SelectProps = StrictOmit<
  ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> &
  Pick<ElementStatusProps, 'isDisabled'> & {
    children: [
      React.ReactElement<React.ComponentProps<typeof SelectTrigger>>,
      React.ReactElement<React.ComponentProps<typeof SelectContent>>,
    ];
    /** The controlled value of the select. */
    value?: string;
    /** The default value of the select. */
    defaultValue?: string;
    /** A function to get the display content for a given value. */
    getContent?: (value: string) => string;
    /** Callback function when the value changes. */
    onChange?: (value: string) => void;
  };

const defaultGetContent = (value: string) => value;

/**
 * A component that allows users to select a value from a list.
 *
 * @example
 * ```tsx
 * <Select defaultValue="1">
 *   <SelectTrigger placeholder="Select a number" />
 *   <SelectContent>
 *     <SelectItem value="1">One</SelectItem>
 *     <SelectItem value="2">Two</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const Select = ({
  children,
  testId = 'select',
  value,
  defaultValue = '',
  getContent = defaultGetContent,
  onChange,
  isDisabled = false,
  ...props
}: SelectProps): React.JSX.Element => {
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
