import type {
  ComponentPropsWithRef,
  ElementStatusProps,
  ElementVariant,
  LabelProps,
  StrictExtract,
  StrictOmit,
} from '@types';

import { cn } from '@utils';

import { Flex } from '@layouts/Flex';

type TextFieldType = StrictExtract<
  React.HTMLInputTypeAttribute,
  'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
>;
export type TextFieldProps = StrictOmit<
  ComponentPropsWithRef<'input'>,
  | 'children'
  | 'type'
  | 'size'
  | 'placeholder'
  | 'required'
  | 'defaultChecked'
  | 'checked'
> &
  LabelProps &
  Pick<ElementStatusProps, 'isDisabled'> & {
    /** The visual style of the text field. */
    variant?: ElementVariant;
    /** The type of the input element. */
    type?: TextFieldType;
    /** If true, the field will be required. */
    isRequired?: boolean;
    /** If true, the field will be in an error state. */
    hasError?: boolean;
    /** A description or helper text for the field. */
    description?: string;
    /** An element to display on the left side of the input. */
    leftInput?: NonNullable<React.ReactNode>;
    /** An element to display on the right side of the input. */
    rightInput?: NonNullable<React.ReactNode>;
  };

/**
 * A component for user text input.
 *
 * @example
 * ```tsx
 * <TextField label="Name" />
 * <TextField type="password" label="Password" />
 * <TextField variant="filled" label="Email" description="We'll never share your email." />
 * ```
 */
export const TextField = ({
  variant = 'outlined',
  type = 'text',
  label = '',
  testId = 'text-field',
  isDisabled = false,
  isRequired = false,
  hasError = false,
  description = '',
  rightInput,
  ...props
}: TextFieldProps): React.JSX.Element => {
  return (
    <Flex direction="column" gap={{ row: 1 }} className="has-disabled:disabled">
      <fieldset className="group relative">
        {label.length > 0 && (
          <label
            data-testid={`${testId}-label`}
            htmlFor={props.id}
            className={cn(
              'peer text-body3 group-has-placeholder-shown:not-group-has-[input:focus]:text-body1 absolute z-1 transition-all not-group-has-disabled:cursor-text group-has-disabled:pointer-events-none group-has-[input:focus]:opacity-100',

              // color
              hasError
                ? 'text-danger-light dark:text-danger-dark'
                : 'group-has-[input:focus]:text-primary-light text-foreground-light/38 dark:text-foreground-dark/38 dark:group-has-[input:focus]:text-primary-dark',

              // position
              variant === 'outlined' ? 'top-0' : 'top-0.5',
              variant !== 'standard' && 'left-2 px-1',
              variant === 'outlined'
                ? '-translate-y-1/2 group-has-placeholder-shown:not-group-has-[input:focus]:translate-y-1/2'
                : variant === 'filled'
                  ? 'group-has-placeholder-shown:not-group-has-[input:focus]:translate-y-[calc(50%-0.125rem)]'
                  : 'group-has-placeholder-shown:not-group-has-[input:focus]:translate-y-[calc((19/24)*100%-0.125rem)]',

              // (outlined) background color
              variant === 'outlined' &&
                'bg-background-light dark:bg-background-dark',
            )}
          >
            {label}
            {isRequired && (
              <span aria-hidden={true} className="ml-1">
                *
              </span>
            )}
          </label>
        )}
        <Flex
          testId={`${testId}-wrapper`}
          alignItems="center"
          className={cn(
            'transition-all',

            // border
            variant !== 'standard' ? 'rounded border' : 'border-y',

            // border color
            variant === 'filled'
              ? 'border-secondary-light dark:border-secondary-dark'
              : 'border-foreground-light/38 dark:border-foreground-dark/38',
            variant === 'standard' && 'border-t-transparent!',
            hasError
              ? 'border-danger-light dark:border-danger-dark'
              : 'hover:not-has-[input:focus]:not-disabled:border-foreground-light peer-hover:not-has-[input:focus]:not-disabled:border-foreground-light has-[input:focus]:not-disabled:border-primary-light dark:hover:not-has-[input:focus]:not-disabled:border-foreground-dark dark:peer-hover:not-has-[input:focus]:not-disabled:border-foreground-dark dark:has-[input:focus]:not-disabled:border-primary-dark',

            // background color
            variant === 'filled'
              ? 'bg-secondary-light dark:bg-secondary-dark'
              : 'bg-background-light dark:bg-background-dark',
          )}
        >
          <input
            {...props}
            aria-disabled={isDisabled}
            aria-invalid={hasError}
            data-testid={testId}
            type={type}
            placeholder=" "
            required={isRequired}
            disabled={isDisabled}
            className={cn(
              props.className,
              'text-body1 outline-none',

              // padding
              variant !== 'standard' && 'px-3',
              variant === 'outlined' ? 'py-2.75' : 'pt-4.5 pb-1',
            )}
          />
          {rightInput}
        </Flex>
      </fieldset>
      {description.length > 0 && (
        <p
          className={cn(
            'text-body3',

            // validation
            hasError
              ? 'text-danger-light dark:text-danger-dark'
              : 'text-foreground-light/38 dark:text-foreground-dark/38',

            // spacing
            variant !== 'standard' && 'px-3.25',
          )}
        >
          {description}
        </p>
      )}
    </Flex>
  );
};

export default TextField;
