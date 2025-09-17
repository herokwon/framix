import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  ELEMENT_COLORS,
  HEADING_HTML_TAGS,
  HORIZONTAL_ALIGNMENTS,
} from '@data';

import { Flex, Grid } from '@layouts';

import Heading from './Heading';
import TextMeta from './Text.stories';

const meta = {
  title: 'Components/UI/Heading',
  tags: ['autodocs'],
  component: Heading,
  args: {
    as: 'h1',
    color: 'default',
    align: 'left',
  },
  argTypes: {
    as: {
      control: 'select',
      options: HEADING_HTML_TAGS,
    },
    align: TextMeta.argTypes.align,
  },
} satisfies Meta<typeof Heading>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a heading component.',
  },
};

export const RenderedHTMLElement: Story = {
  render: args => {
    return (
      <Grid placeItems="center" gap={{ row: 4 }}>
        {HEADING_HTML_TAGS.map(element => (
          <Heading {...args} key={element} as={element}>
            {`Heading as <${element}>`}
          </Heading>
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
          <Heading {...args} key={color} color={color}>
            {color[0].toUpperCase() + color.substring(1)}
          </Heading>
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
        className="shadow-outline shadow-secondary-light dark:shadow-secondary-dark w-[75vw] rounded p-4"
      >
        {HORIZONTAL_ALIGNMENTS.map(align => (
          <Heading {...args} key={align} align={align}>
            {`${align}-aligned`}
          </Heading>
        ))}
      </Flex>
    );
  },
};
