import type { Meta, StoryObj } from '@storybook/react-vite';

import { ELEMENT_SIZES } from '@data';

import { Flex } from '@layouts';

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

export const Size: Story = {
  render: args => {
    return (
      <Flex gap={{ column: 4 }}>
        {ELEMENT_SIZES.map(size => (
          <Spinner {...args} key={size} size={size} />
        ))}
      </Flex>
    );
  },
};
