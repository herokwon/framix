import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Check } from 'lucide-react';

import IconButton from './IconButton';

const meta = {
  title: 'Components/UI/IconButton',
  tags: ['autodocs'],
  component: IconButton,
  args: {
    icon: Check,
    variant: 'filled',
    color: 'default',
    size: 'md',
    shape: 'circle',
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
} satisfies Meta<typeof IconButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Icon: Story = {
  args: {
    variant: 'icon',
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

export const Square: Story = {
  args: {
    shape: 'square',
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
