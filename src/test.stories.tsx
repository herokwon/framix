import type { Meta, StoryObj } from '@storybook/react-vite';

const Test = () => {
  return <div>Test component</div>;
};

const meta = {
  title: 'Example',
  tags: ['autodocs'],
  component: Test,
} satisfies Meta<typeof Test>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
