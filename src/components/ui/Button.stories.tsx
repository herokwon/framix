import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Check, Plus } from 'lucide-react';

import {
  BUTTON_HTML_TAGS,
  ELEMENT_COLORS,
  ELEMENT_SIZES,
  ELEMENT_VARIANTS,
} from '@data';

import { Flex, Grid } from '@layouts';

import Button from './Button';

const meta = {
  title: 'Components/UI/Button',
  tags: ['autodocs'],
  component: Button,
  args: {
    as: 'button',
    children: 'Click me',
    variant: 'filled',
    color: 'default',
    size: 'md',
    testId: 'button',
    label: 'Button',
    isDisabled: false,
    isSelected: false,
    isLoading: false,
    onClick: fn(),
  },
  argTypes: {
    as: {
      control: 'radio',
      options: BUTTON_HTML_TAGS,
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RenderedHTMLElement: Story = {
  render: args => {
    return (
      <Grid placeItems="center" gap={{ row: 4 }}>
        {BUTTON_HTML_TAGS.map(element => (
          <Button {...args} key={element} as={element}>
            {`Button as <${element}>`}
          </Button>
        ))}
      </Grid>
    );
  },
};

export const Variant: Story = {
  render: args => {
    return (
      <Flex gap={{ column: 4 }}>
        {ELEMENT_VARIANTS.map(variant => (
          <Button {...args} key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Flex>
    );
  },
};

export const Color: Story = {
  render: args => {
    return (
      <Grid placeItems="center" gap={4} templateColumns={{ repeat: 3 }}>
        {ELEMENT_COLORS.map(color => (
          <Button {...args} key={color} color={color}>
            {color[0].toUpperCase() + color.substring(1)}
          </Button>
        ))}
      </Grid>
    );
  },
};

export const Size: Story = {
  render: args => {
    return (
      <Flex alignItems="center" gap={{ column: 4 }}>
        {ELEMENT_SIZES.map(size => (
          <Button {...args} key={size} size={size}>
            {size}
          </Button>
        ))}
      </Flex>
    );
  },
};

export const Circle: Story = {
  args: {
    shape: 'circle',
  },
};

export const FullWidth: Story = {
  args: {
    isFullWidth: true,
  },
  render: args => {
    return (
      <div className="w-[75vw]">
        <Button {...args}>Full width</Button>
      </div>
    );
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

export const Icon: Story = {
  render: args => {
    return (
      <Grid placeItems="center" gap={4}>
        <Button
          {...args}
          leftIcon={Check}
          testId="button-left-icon"
          style={{ gridColumn: 1, gridRow: 1 }}
        >
          Left Icon
        </Button>
        <Button
          {...args}
          rightIcon={Check}
          testId="button-right-icon"
          style={{ gridColumn: 2, gridRow: 1 }}
        >
          Right Icon
        </Button>
        <Button
          {...args}
          leftIcon={Plus}
          rightIcon={Plus}
          testId="button-both-icons"
          style={{
            gridColumn: '1 / 3',
            gridRow: 2,
          }}
        >
          Both Icons
        </Button>
      </Grid>
    );
  },
};
