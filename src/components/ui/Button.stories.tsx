import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Check, Plus } from 'lucide-react';

import Button from './Button';

const meta = {
  title: 'Components/UI/Button',
  tags: ['autodocs'],
  component: Button,
  args: {
    children: 'Click me',
    variant: 'filled',
    color: 'default',
    size: 'md',
    testId: 'button',
    label: 'Button',
    isDisabled: false,
    isSelected: false,
    isLoading: false,
    onClick: fn(),
  },
  argTypes: {
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
  },
};

export const Info: Story = {
  args: {
    color: 'info',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Circle: Story = {
  args: {
    shape: 'circle',
  },
};

export const FullWidth: Story = {
  args: {
    isFullWidth: true,
  },
  render: args => {
    return (
      <div className="w-[75vw]">
        <Button {...args}>Full width</Button>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const LeftIcon: Story = {
  args: {
    leftIcon: Check,
  },
};

export const RightIcon: Story = {
  args: {
    rightIcon: Check,
  },
};

export const BothIcons: Story = {
  args: {
    leftIcon: Plus,
    rightIcon: Plus,
  },
};
