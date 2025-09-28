import { ChevronDown } from 'lucide-react';

import { cn } from '@utils';

import { IconButton } from '@components/ui';

import TextField from '../TextField';
import { useSelect } from './Select.context';

const SelectTrigger = ({
  placeholder = 'Select an option',
}: {
  placeholder?: string;
}) => {
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
          variant="icon"
          size="sm"
          className={cn('transition-transform', open && 'rotate-180')}
          onClick={updateOpenState}
        />
      }
    />
  );
};

export default SelectTrigger;
