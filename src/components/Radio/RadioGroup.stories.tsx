import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Grid } from '@layouts/Grid';

import { Text } from '../Text';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    isDisabled: false,
    value: '',
    defaultValue: '',
    name: 'color',
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: args => {
    return (
      <RadioGroup {...args} defaultValue="red">
        <Radio value="red" label="Red" />
        <Radio value="blue" label="Blue" />
      </RadioGroup>
    );
  },
};

export const Controlled: Story = {
  args: {
    value: 'red',
  },
  render: args => {
    const [value, setValue] = useState<string>('red');

    const handleChange = (value: string) => {
      setValue(value);
    };

    useEffect(() => {
      setValue(args.value ?? 'red');
    }, [args.value]);

    return (
      <Grid justifyContent="stretch" gap={{ row: 4 }} className="w-40">
        <RadioGroup {...args} value={value} onChange={handleChange}>
          <Radio value="red" label="Red" />
          <Radio value="blue" label="Blue" />
        </RadioGroup>
        <Text as="p">Selected value: {value}</Text>
      </Grid>
    );
  },
};

export const AllDisabled: Story = {
  args: {
    name: 'color',
    isDisabled: true,
  },
  render: args => {
    return (
      <RadioGroup {...args}>
        <Radio value="red" label="Red" />
        <Radio value="blue" label="Blue" />
        <Radio value="yellow" label="Yellow" />
      </RadioGroup>
    );
  },
};

export const PartiallyDisabled: Story = {
  args: {
    name: 'color',
  },
  render: args => {
    return (
      <RadioGroup {...args}>
        <Radio value="red" label="Red" />
        <Radio value="blue" label="Blue" />
        <Radio value="green" label="Green" isDisabled />
      </RadioGroup>
    );
  },
};
