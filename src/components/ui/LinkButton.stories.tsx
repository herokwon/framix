import type { Meta, StoryObj } from '@storybook/react-vite';

import { ArrowRight } from 'lucide-react';

import { isLocalURL } from '@utils';

import { Flex } from '@layouts';

import LinkButton from './LinkButton';

const meta = {
  title: 'Components/UI/LinkButton',
  tags: ['autodocs'],
  component: LinkButton,
  args: {
    children: 'Link',
    variant: 'filled',
    size: 'md',
    shape: 'square',
    href: '#',
    isDisabled: false,
    isSelected: false,
    isLoading: false,
  },
} satisfies Meta<typeof LinkButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const InternalURL: Story = {
  args: {
    href: '#test',
  },
  render: args => {
    const hasExternalUrl = !isLocalURL({
      url:
        typeof args.href === 'string' ? args.href : (args.href?.pathname ?? ''),
    });

    return (
      <Flex direction="column" gap={{ row: 1 }}>
        <LinkButton {...args} />
        <p className="text-body3 text-info-light dark:text-info-dark font-semibold">{`${hasExternalUrl ? 'External' : 'Internal'} URL`}</p>
      </Flex>
    );
  },
};

export const ExternalURL: Story = {
  args: {
    href: 'https://example.com',
  },
  render: args => {
    const hasExternalUrl = !isLocalURL({
      url:
        typeof args.href === 'string' ? args.href : (args.href?.pathname ?? ''),
    });

    return (
      <Flex direction="column" gap={{ row: 1 }}>
        <LinkButton {...args} />
        <p className="text-body3 text-info-light dark:text-info-dark font-semibold">{`${hasExternalUrl ? 'External' : 'Internal'} URL`}</p>
      </Flex>
    );
  },
};

export const WithIcon: Story = {
  args: {
    rightIcon: ArrowRight,
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
