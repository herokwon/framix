import { cn } from '@utils';

import { Grid } from '@layouts';

import { useSelect } from './Select.context';
import type { SelectItem } from './SelectItem';

export type SelectContentProps = {
  children: React.ReactElement<React.ComponentProps<typeof SelectItem>>[];
};

export const SelectContent = ({ children }: SelectContentProps) => {
  const { ids, open } = useSelect('SelectContent');

  return (
    <Grid
      as="ul"
      role="listbox"
      id={ids.content}
      label="Select content"
      testId="select-content"
      justifyContent="stretch"
      className={cn(
        'bg-background-light shadow-overlay dark:bg-secondary-dark absolute top-full z-10 mt-1 min-w-full rounded py-2 transition-all',
        !open && 'pointer-events-none translate-y-1 opacity-0',
      )}
    >
      {children}
    </Grid>
  );
};
