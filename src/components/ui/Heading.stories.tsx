import type { Meta, StoryObj } from '@storybook/react-vite';

import { ELEMENT_COLORS, HEADING_HTML_TAGS } from '@data';

import { Flex } from '@layouts';

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
      <Flex direction="column" alignItems="center" gap={{ row: 2 }}>
        {HEADING_HTML_TAGS.map(element => (
          <Heading {...args} key={element} as={element}>
            {`Heading as <${element}>`}
          </Heading>
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
          <Heading {...args} key={color} color={color}>
            {`Heading color: ${color}`}
          </Heading>
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
        {(['left', 'center', 'right'] as const).map(align => (
          <Heading {...args} key={align} align={align}>
            {`Heading align: ${align}`}
          </Heading>
        ))}
      </Flex>
    );
  },
};
