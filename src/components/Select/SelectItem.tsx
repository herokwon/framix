import type { ElementStatusProps } from '@types';

import { cn } from '@utils';

import { Text } from '../Text';
import { useSelect } from './Select.context';

export type SelectItemProps = Pick<ElementStatusProps, 'isDisabled'> &
  Required<
    React.PropsWithChildren<{
      value: string;
    }>
  >;

export const SelectItem = ({
  children,
  value,
  isDisabled: itemDisabled = false,
}: SelectItemProps) => {
  const {
    isDisabled: selectDisabled,
    value: selected,
    onChange,
  } = useSelect('SelectItem');

  const isDisabled: boolean = selectDisabled || itemDisabled;
  const isSelected: boolean = selected === value;

  return (
    <li
      role="option"
      tabIndex={0}
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      onClick={() => {
        if (isDisabled) return;
        onChange(value);
      }}
      onKeyDown={e => {
        if (isDisabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(value);
        }
      }}
      className={cn(
        'size-full cursor-pointer px-3 py-2 transition-colors',

        isSelected
          ? 'bg-secondary-light-hover dark:bg-secondary-dark-active'
          : !isDisabled &&
              'hover:bg-secondary-light dark:hover:bg-secondary-dark-hover',
      )}
    >
      <Text as="p" weight={isSelected ? 'semibold' : 'normal'}>
        {children}
      </Text>
    </li>
  );
};
