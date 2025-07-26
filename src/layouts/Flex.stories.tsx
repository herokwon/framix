import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box, Flex } from '@layouts';

const meta = {
  title: 'Layouts/Flex',
  tags: ['autodocs'],
  component: Flex,
  args: {
    as: 'div',
    direction: 'row',
    justifyContent: 'start',
    alignItems: 'stretch',
    gap: { row: 0, column: 0 },
  },
} satisfies Meta<typeof Flex>;
export default meta;

type Story = StoryObj<typeof meta>;

const FlexBox = ({
  length,
  prop,
  ...props
}: Parameters<typeof Flex>[0] & {
  length: number;
  prop: { name: string; value: string };
}) => {
  return (
    <Box className="space-y-compact">
      <h3 className="text-lg font-semibold">
        <span className="font-medium">{prop.name}:</span> {prop.value}
      </h3>
      <Flex
        {...props}
        className="border-neutral-light dark:border-neutral-dark p-normal *:text-default-dark *:dark:text-default-light rounded-md border font-semibold"
      >
        {Array.from({ length }, (_, i) => (
          <Box
            key={i}
            className="bg-primary-light dark:bg-primary-dark border-neutral-light dark:border-neutral-dark flex size-16 items-center justify-center rounded-md border"
          >
            {i + 1}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export const Direction: Story = {
  render: () => (
    <Box className="space-y-loose p-loose">
      <FlexBox
        length={3}
        prop={{ name: 'Direction', value: 'row' }}
        direction="row"
      />

      <FlexBox
        length={3}
        prop={{ name: 'Direction', value: 'row-reverse' }}
        direction="row-reverse"
      />

      <FlexBox
        length={3}
        prop={{ name: 'Direction', value: 'column' }}
        direction="column"
      />

      <FlexBox
        length={3}
        prop={{ name: 'Direction', value: 'column-reverse' }}
        direction="column-reverse"
      />
    </Box>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <Box className="space-y-loose p-loose *:w-100">
      <FlexBox
        length={3}
        prop={{ name: 'JustifyContent', value: 'start' }}
        justifyContent="start"
      />

      <FlexBox
        length={3}
        prop={{ name: 'JustifyContent', value: 'center' }}
        justifyContent="center"
      />

      <FlexBox
        length={3}
        prop={{ name: 'JustifyContent', value: 'end' }}
        justifyContent="end"
      />

      <FlexBox
        length={3}
        prop={{ name: 'JustifyContent', value: 'space-around' }}
        justifyContent="space-around"
      />

      <FlexBox
        length={3}
        prop={{ name: 'JustifyContent', value: 'space-between' }}
        justifyContent="space-between"
      />

      <FlexBox
        length={3}
        prop={{ name: 'JustifyContent', value: 'space-evenly' }}
        justifyContent="space-evenly"
      />
    </Box>
  ),
};

export const AlignItems: Story = {
  render: () => (
    <Box className="space-y-loose p-loose *:last:*:last:*:last:text-heading1 *:last:*:last:*:first:text-title2 *:last:*:last:*:nth-[2]:text-body3 *:not-[&:nth-child(4)]:*:last:*:last:h-20 *:not-[&:nth-child(4)]:*:last:*:nth-[2]:h-12 *:nth-last-[2]:*:last:*:h-full *:nth-last-[2]:*:last:h-36">
      <FlexBox
        length={3}
        prop={{ name: 'AlignItems', value: 'start' }}
        alignItems="start"
      />

      <FlexBox
        length={3}
        prop={{ name: 'AlignItems', value: 'center' }}
        alignItems="center"
      />

      <FlexBox
        length={3}
        prop={{ name: 'AlignItems', value: 'end' }}
        alignItems="end"
      />

      <FlexBox
        length={3}
        prop={{ name: 'AlignItems', value: 'stretch' }}
        alignItems="stretch"
      />

      <FlexBox
        length={3}
        prop={{ name: 'AlignItems', value: 'baseline' }}
        alignItems="baseline"
      />
    </Box>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Box className="space-y-loose p-loose *:*:last:w-40 *:*:last:*:flex-shrink-0">
      <FlexBox
        length={4}
        prop={{ name: 'Wrap', value: 'nowrap' }}
        wrap="nowrap"
      />

      <FlexBox length={4} prop={{ name: 'Wrap', value: 'wrap' }} wrap="wrap" />

      <FlexBox
        length={4}
        prop={{ name: 'Wrap', value: 'wrap-reverse' }}
        wrap="wrap-reverse"
      />
    </Box>
  ),
};

export const Gap: Story = {
  render: () => (
    <Box className="space-y-loose p-loose *:last:w-60 *:last:*:last:*:*:flex-shrink-0">
      <FlexBox
        length={3}
        prop={{ name: 'Gap', value: 'row=0, column=0' }}
        gap={{
          row: 0,
          column: 0,
        }}
      />

      <FlexBox
        length={3}
        prop={{ name: 'Gap', value: 'row=0, column=2' }}
        gap={{
          row: 0,
          column: 2,
        }}
      />

      <FlexBox
        length={3}
        prop={{ name: 'Gap', value: 'row=2, column=0' }}
        direction="column"
        alignItems="center"
        gap={{
          row: 2,
          column: 0,
        }}
      />

      <FlexBox
        length={4}
        prop={{ name: 'Gap', value: 'row=2, column=2' }}
        justifyContent="center"
        wrap="wrap"
        gap={{
          row: 2,
          column: 2,
        }}
      />
    </Box>
  ),
};

export const Combined: Story = {
  render: () => (
    <Box className="space-y-loose p-loose *:first:*:last:h-48">
      <FlexBox
        length={3}
        prop={{ name: 'Combined', value: 'Column + Center + Wrap' }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        wrap="wrap"
        gap={{
          row: 1,
          column: 1,
        }}
      />

      <FlexBox
        length={3}
        prop={{ name: 'Combined', value: 'Row + Space-between + Stretch' }}
        justifyContent="space-between"
      />
    </Box>
  ),
};
