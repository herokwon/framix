import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  ELEMENT_COLORS,
  ELEMENT_SIZES,
  HORIZONTAL_ALIGNMENTS,
  TEXT_HTML_TAGS,
} from '@data';

import { Flex } from '@layouts';

import Text from './Text';

const meta = {
  title: 'Components/UI/Text',
  tags: ['autodocs'],
  component: Text,
  args: {
    as: 'span',
    color: 'default',
    isColorInverted: false,
    size: 'md',
    align: 'left',
    weight: 'normal',
    testId: 'text',
  },
  argTypes: {
    as: {
      control: 'select',
      options: TEXT_HTML_TAGS,
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
  },
} satisfies Meta<typeof Text>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a text component.',
  },
};

export const RenderedHTMLElement: Story = {
  render: args => {
    return (
      <Flex direction="column" alignItems="center" gap={{ row: 2 }}>
        {TEXT_HTML_TAGS.map(element => (
          <Text {...args} key={element} as={element}>
            {`Text as <${element}>`}
          </Text>
        ))}
      </Flex>
    );
  },
};

export const Colors: Story = {
  render: args => {
    return (
      <Flex direction="column" alignItems="center" gap={{ row: 2 }}>
        {ELEMENT_COLORS.map(color => (
          <Text {...args} key={color} color={color}>
            {`Text color: ${color}`}
          </Text>
        ))}
      </Flex>
    );
  },
};

export const ColorInverted: Story = {
  args: {
    isColorInverted: true,
  },
  render: args => {
    return (
      <Flex
        direction="column"
        alignItems="center"
        gap={{ row: 2 }}
        className="bg-background-dark dark:bg-background-light p-8"
      >
        {ELEMENT_COLORS.map(color => (
          <Text {...args} key={color} color={color}>
            {`Text color: ${color} (inverted)`}
          </Text>
        ))}
      </Flex>
    );
  },
};

export const Sizes: Story = {
  render: args => {
    return (
      <Flex direction="column" alignItems="center" gap={{ row: 1 }}>
        {ELEMENT_SIZES.map(size => (
          <Text {...args} key={size} size={size}>
            {`Font size: ${size}`}
          </Text>
        ))}
      </Flex>
    );
  },
};

export const Alignments: Story = {
  render: args => {
    return (
      <Flex
        direction="column"
        gap={{ row: 2 }}
        className="shadow-outline shadow-secondary-light dark:shadow-secondary-dark w-[75vw] p-4"
      >
        {HORIZONTAL_ALIGNMENTS.map(align => (
          <Text {...args} key={align} align={align}>
            {`Text align: ${align}`}
          </Text>
        ))}
      </Flex>
    );
  },
};

export const Weights: Story = {
  render: args => {
    return (
      <Flex direction="column" alignItems="center" gap={{ row: 2 }}>
        {(['normal', 'medium', 'semibold', 'bold'] as const).map(weight => (
          <Text {...args} key={weight} weight={weight}>
            {`Font weight: ${weight}`}
          </Text>
        ))}
      </Flex>
    );
  },
};
