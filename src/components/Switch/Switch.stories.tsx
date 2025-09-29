import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Switch } from './Switch';

const meta = {
  title: 'Components/Form/Switch',
  component: Switch,
  args: {
    isDisabled: false,
    defaultChecked: false,
    hasShadow: true,
  },
} satisfies Meta<typeof Switch>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  args: {
    isChecked: false,
  },
  render: args => {
    const [isChecked, setIsChecked] = useState<boolean>(
      args.isChecked ?? false,
    );

    useEffect(() => {
      setIsChecked(args.isChecked ?? false);
    }, [args.isChecked]);

    return <Switch {...args} isChecked={isChecked} onChange={setIsChecked} />;
  },
};

export const Uncontrolled: Story = {
  args: {
    onChange: fn(),
  },
  render: args => <Switch {...args} />,
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const NotHasShadow: Story = {
  args: {
    hasShadow: false,
  },
};
