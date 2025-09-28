import type { Meta, StoryObj } from '@storybook/react-vite';

import Select from './Select';
import SelectContent from './SelectContent';
import SelectItem from './SelectItem';
import SelectTrigger from './SelectTrigger';

const meta = {
  title: 'Components/Form/Select',
  component: Select,
  args: {},
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof Select>;

const options = [
  { value: 'apple', content: 'Apple' },
  { value: 'banana', content: 'Banana' },
  { value: 'peach', content: 'Peach' },
] satisfies { value: string; content: string }[];

export const Default: Story = {
  render: args => {
    return (
      <Select
        {...args}
        getContent={value =>
          options.find(option => option.value === value)?.content ?? ''
        }
      >
        <SelectTrigger placeholder="Fruits" />
        <SelectContent>
          {options.map(({ value, content }) => (
            <SelectItem key={value} value={value}>
              {content}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
};
