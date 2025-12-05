import { cn } from '@utils';

import { Grid } from '@layouts/Grid';

import { useSelect } from './Select.context';
import type { SelectItem } from './SelectItem';

export interface SelectContentProps {
  /** The items to be displayed in the select content. */
  children: React.ReactElement<React.ComponentProps<typeof SelectItem>>[];
}

/**
 * The container for the options of a Select component.
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
export const SelectContent = ({
  children,
}: SelectContentProps): React.JSX.Element => {
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
