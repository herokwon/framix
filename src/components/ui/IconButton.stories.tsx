import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Check } from 'lucide-react';

import { ELEMENT_COLORS, ELEMENT_SIZES, ELEMENT_VARIANTS } from '@data';

import { Grid } from '@layouts';

import IconButton from './IconButton';

const ICON_BUTTON_VARIANTS = ELEMENT_VARIANTS.map(variant =>
  variant === 'text' ? 'icon' : variant,
);

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
    variant: {
      control: 'radio',
      options: ICON_BUTTON_VARIANTS,
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
    },
  },
} satisfies Meta<typeof IconButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variant: Story = {
  render: args => {
    return (
      <Grid gap={4}>
        {ICON_BUTTON_VARIANTS.map(variant => (
          <IconButton {...args} key={variant} variant={variant} />
        ))}
      </Grid>
    );
  },
};

export const Color: Story = {
  render: args => {
    return (
      <Grid gap={4} templateColumns={{ repeat: 3 }}>
        {ELEMENT_COLORS.map(color => (
          <IconButton {...args} key={color} color={color} />
        ))}
      </Grid>
    );
  },
};

export const Size: Story = {
  render: args => {
    return (
      <Grid gap={4}>
        {ELEMENT_SIZES.map(size => (
          <IconButton {...args} key={size} size={size} />
        ))}
      </Grid>
    );
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
