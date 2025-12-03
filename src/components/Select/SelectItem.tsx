import type { ElementStatusProps } from '@types';

import { cn } from '@utils';

import { Text } from '../Text';
import { useSelect } from './Select.context';

export type SelectItemProps = Pick<ElementStatusProps, 'isDisabled'> & {
  /** The content to be displayed in the item. */
  children: NonNullable<React.ReactNode>;
  /** The unique value of the item. */
  value: string;
};

/**
 * An item within a Select component.
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
export const SelectItem = ({
  children,
  value,
  isDisabled: itemDisabled = false,
}: SelectItemProps): React.JSX.Element => {
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
