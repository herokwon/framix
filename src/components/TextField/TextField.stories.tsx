import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Eye, EyeOff } from 'lucide-react';

import { IconButton } from '../Button';
import { TextField, type TextFieldProps } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    variant: 'outlined',
    type: 'text',
    testId: 'text-field',
    label: '',
    id: crypto.randomUUID(),
    isDisabled: false,
    isRequired: false,
    hasError: false,
    description: '',
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'email',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'url',
      ] satisfies TextFieldProps['type'][],
    },
  },
} satisfies Meta<typeof TextField>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Outlined',
    name: 'outlined-text-field',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled',
    name: 'filled-text-field',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    label: 'Text',
    name: 'text-field',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    label: 'Disabled',
    name: 'disabled-text-field',
  },
};

export const Required: Story = {
  args: {
    isRequired: true,
    label: 'Required',
    name: 'required-text-field',
    description: 'This field is required.',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Invalid',
    hasError: true,
    name: 'invalid-text-field',
    defaultValue: 'Invalid value',
    description: 'There is an error with this field.',
  },
};

export const EmailType: Story = {
  args: {
    type: 'email',
    label: 'Email',
    name: 'email-text-field',
  },
  render: args => {
    return <TextField {...args} />;
  },
};

export const RightInput: Story = {
  args: {
    type: 'password',
    label: 'Password',
    name: 'password-text-field',
  },
  render: args => {
    const [isShowing, setIsShowing] = useState<boolean>(false);

    const toggleShowing = () => setIsShowing(prev => !prev);

    return (
      <TextField
        {...args}
        type={isShowing ? 'text' : args.type}
        rightInput={
          <IconButton
            icon={isShowing ? Eye : EyeOff}
            size="sm"
            onClick={toggleShowing}
          />
        }
        description={`password: ${isShowing ? 'visible' : 'hidden'}`}
      />
    );
  },
};
