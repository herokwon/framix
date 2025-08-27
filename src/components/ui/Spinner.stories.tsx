import type { Meta, StoryObj } from '@storybook/react-vite';

import Spinner from './Spinner';

const meta = {
  title: 'Components/UI/Spinner',
  tags: ['autodocs'],
  component: Spinner,
  args: {
    position: 'local',
    size: 'md',
    testId: 'spinner',
    label: 'Loading',
  },
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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
