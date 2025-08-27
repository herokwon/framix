import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@utils';

import { ELEMENT_SIZES } from '@data';

import Container from './Container';

const meta = {
  title: 'Layouts/Container',
  tags: ['autodocs'],
  component: Container,
  args: {
    as: 'section',
    className: 'bg-neutral-light dark:bg-neutral-dark h-screen',
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Container>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fixed: false,
    className: cn(meta.args.className, 'mx-auto w-3/4'),
  },
};

export const WithMaxWidth: Story = {
  args: {
    fixed: false,
    maxWidth: 'sm',
    className: cn(meta.args.className, 'mx-auto w-3/4'),
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ELEMENT_SIZES,
    },
  },
};

export const Fixed: Story = {
  args: {
    fixed: true,
    className: cn(meta.args.className, 'mx-auto w-3/4'),
  },
};
