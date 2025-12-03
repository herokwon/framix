import { ChevronDown } from 'lucide-react';

import { cn } from '@utils';

import { IconButton } from '../Button';
import { TextField } from '../TextField';
import { useSelect } from './Select.context';

export interface SelectTriggerProps {
  /** The placeholder text to display when no value is selected. */
  placeholder?: string;
}

/**
 * The trigger that opens the select menu.
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
export const SelectTrigger = ({
  placeholder = 'Select an option',
}: SelectTriggerProps): React.JSX.Element => {
  const { value, ids, open, setOpen, getContent } = useSelect('SelectTrigger');

  const updateOpenState = () => setOpen(prev => !prev);

  return (
    <TextField
      ref={node => {
        /* istanbul ignore next */
        if (!node) return;

        if (open) node.focus();
        else node.blur();
      }}
      readOnly
      role="combobox"
      aria-readonly={true}
      aria-expanded={open}
      aria-controls={ids.content}
      label={placeholder}
      testId="select-trigger"
      id={ids.trigger}
      value={getContent(value)}
      onClick={updateOpenState}
      rightInput={
        <IconButton
          tabIndex={-1}
          icon={ChevronDown}
          size="sm"
          className={cn('transition-transform', open && 'rotate-180')}
          onClick={updateOpenState}
        />
      }
    />
  );
};
