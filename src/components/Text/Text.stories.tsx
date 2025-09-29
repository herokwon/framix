import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  ELEMENT_COLORS,
  ELEMENT_SIZES,
  HORIZONTAL_ALIGNMENTS,
  TEXT_HTML_TAGS,
} from '@data';

import { Flex } from '@layouts/Flex';
import { Grid } from '@layouts/Grid';

import { Text } from './Text';

const meta = {
  title: 'Components/Text',
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
      <Grid placeItems="center" gap={{ row: 4 }}>
        {TEXT_HTML_TAGS.map(element => (
          <Text {...args} key={element} as={element}>
            {`Text as <${element}>`}
          </Text>
        ))}
      </Grid>
    );
  },
};

export const Color: Story = {
  render: args => {
    return (
      <Grid placeItems="center" gap={4} templateColumns={{ repeat: 3 }}>
        {ELEMENT_COLORS.map(color => (
          <Text {...args} key={color} color={color}>
            {color[0].toUpperCase() + color.substring(1)}
          </Text>
        ))}
      </Grid>
    );
  },
};

export const ColorInverted: Story = {
  args: {
    isColorInverted: true,
  },
  render: args => {
    return (
      <Grid
        placeItems="center"
        gap={4}
        templateColumns={{ repeat: 3 }}
        className="bg-background-dark dark:bg-background-light p-8"
      >
        {ELEMENT_COLORS.map(color => (
          <Text {...args} key={color} color={color}>
            {`${color} (inverted)`}
          </Text>
        ))}
      </Grid>
    );
  },
};

export const Size: Story = {
  render: args => {
    return (
      <Grid placeItems="center" gap={{ row: 4 }}>
        {ELEMENT_SIZES.map(size => (
          <Text {...args} key={size} size={size}>
            {`Font size: ${size}`}
          </Text>
        ))}
      </Grid>
    );
  },
};

export const Alignment: Story = {
  render: args => {
    return (
      <Flex
        direction="column"
        gap={{ row: 4 }}
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

export const Weight: Story = {
  render: args => {
    return (
      <Grid placeItems="center" gap={{ row: 4 }}>
        {(['normal', 'medium', 'semibold', 'bold'] as const).map(weight => (
          <Text {...args} key={weight} weight={weight}>
            {`Font weight: ${weight}`}
          </Text>
        ))}
      </Grid>
    );
  },
};
