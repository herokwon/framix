import type { Meta, StoryObj } from '@storybook/react-vite';

import { ELEMENT_COLORS, ELEMENT_VARIANTS } from '@data';

import { Grid } from '@layouts';

import { Alert } from './Alert';

const AlertColors = ELEMENT_COLORS.filter(color => color !== 'primary');

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    variant: 'text',
    color: 'default',
  },
  argTypes: {
    color: {
      control: 'select',
      options: AlertColors,
    },
  },
} satisfies Meta<typeof Alert>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is an alert message.',
  },
};

export const Variant: Story = {
  args: {
    color: 'success',
  },
  render: args => {
    return (
      <Grid
        gap={{ row: 4 }}
        templateColumns={{
          repeat: 1,
        }}
        className="w-[20vw]"
      >
        {ELEMENT_VARIANTS.map(variant => (
          <Alert {...args} key={variant} variant={variant}>
            {`This is ${variant} alert.`}
          </Alert>
        ))}
      </Grid>
    );
  },
};

export const Color: Story = {
  render: args => {
    return (
      <Grid
        gap={{ row: 4 }}
        templateColumns={{
          repeat: 1,
        }}
        className="w-[20vw]"
      >
        {AlertColors.map(color => (
          <Alert {...args} key={color} color={color}>
            {`This is ${color} alert.`}
          </Alert>
        ))}
      </Grid>
    );
  },
};
