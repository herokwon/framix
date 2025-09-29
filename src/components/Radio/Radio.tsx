import type {
  CheckableStatusProps,
  ComponentPropsWithRef,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { Grid } from '@layouts';

import { Text } from '../Text';
import { useRadioGroup } from './RadioGroup.context';

export type RadioProps = StrictOmit<
  ComponentPropsWithRef<'input'>,
  | 'children'
  | 'type'
  | 'size'
  | 'checked'
  | 'defaultChecked'
  | 'value'
  | 'onChange'
> &
  Pick<CheckableStatusProps, 'isDisabled'> & {
    value?: string;
  };

export const Radio = ({
  testId = 'radio',
  value = '',
  label = value,
  isDisabled: disabled = false,
  ...props
}: RadioProps) => {
  const group = useRadioGroup();

  const isChecked = group.value === value;
  const isDisabled: boolean = disabled || group.isDisabled;

  return (
    <Grid
      as="label"
      testId={`${testId}-wrapper`}
      templateColumns={['min-content', 'auto']}
      placeItems="center"
      gap={{ column: 1 }}
      className={cn(
        'group cursor-pointer auto-cols-[1fr] auto-rows-min',

        // status
        isDisabled && 'disabled',
      )}
    >
      <input
        {...props}
        tabIndex={0}
        type="radio"
        data-testid={testId}
        value={value}
        name={group.name}
        checked={isChecked}
        disabled={isDisabled}
        onChange={e => group.onChange(e.target.value)}
        className={cn(
          props.className,
          'col-[1/2] row-[1/2] size-6 cursor-pointer appearance-none opacity-0',
        )}
      />
      <span className="col-[1/2] row-[1/2]">
        <svg
          aria-hidden={true}
          focusable={false}
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <circle
            cx={12}
            cy={12}
            r={8}
            strokeWidth={1.5}
            className={cn(
              'stroke-foreground-light/38 dark:stroke-foreground-dark/38 fill-transparent transition-colors',

              // status
              isChecked
                ? 'stroke-primary-light dark:stroke-primary-dark'
                : 'group-not-disabled:group-hover:stroke-foreground-light dark:group-not-disabled:group-hover:stroke-foreground-dark',
            )}
          />
          <circle
            cx={12}
            cy={12}
            r={4.5}
            className={cn(
              'fill-primary-light dark:fill-primary-dark transition-opacity',
              !isChecked && 'opacity-0',
            )}
          />
        </svg>
      </span>
      {label.length > 0 && (
        <Text className="col-[2/3] row-[1/2] my-auto w-full">{label}</Text>
      )}
    </Grid>
  );
};
