import type { Meta, StoryObj } from '@storybook/react-vite';

import type { OverlayPosition } from '@types';

import { HORIZONTAL_ALIGNMENTS, VERTICAL_ALIGNMENTS } from '@data';

import { Grid } from '@layouts';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const positionOptions = [
  ...VERTICAL_ALIGNMENTS.flatMap(v =>
    HORIZONTAL_ALIGNMENTS.map(h => (v === 'middle' ? '' : `${v}-${h}`)),
  ).filter(Boolean),
  ...HORIZONTAL_ALIGNMENTS.flatMap(h =>
    VERTICAL_ALIGNMENTS.map(v => (h === 'center' ? '' : `${h}-${v}`)),
  ).filter(Boolean),
];
const gridPositions = {
  'top-left': {
    gridColumn: 2,
    gridRow: 1,
  },
  'top-center': {
    gridColumn: 3,
    gridRow: 1,
  },
  'top-right': {
    gridColumn: 4,
    gridRow: 1,
  },
  'left-top': {
    gridColumn: 1,
    gridRow: 2,
  },
  'left-middle': {
    gridColumn: 1,
    gridRow: 3,
  },
  'left-bottom': {
    gridColumn: 1,
    gridRow: 4,
  },
  'right-top': {
    gridColumn: 5,
    gridRow: 2,
  },
  'right-middle': {
    gridColumn: 5,
    gridRow: 3,
  },
  'right-bottom': {
    gridColumn: 5,
    gridRow: 4,
  },
  'bottom-left': {
    gridColumn: 2,
    gridRow: 5,
  },
  'bottom-center': {
    gridColumn: 3,
    gridRow: 5,
  },
  'bottom-right': {
    gridColumn: 4,
    gridRow: 5,
  },
} satisfies Record<OverlayPosition, { gridColumn: number; gridRow: number }>;

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    position: 'bottom-center',
    content: 'This is a tooltip content',
    isDisabled: false,
  },
  argTypes: {
    position: {
      control: 'select',
      options: positionOptions,
    },
  },
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>Hover me</Button>,
  },
};

export const Positioning: Story = {
  render: args => {
    return (
      <Grid
        templateColumns={{
          repeat: 5,
        }}
        templateRows={{
          repeat: 5,
        }}
        gap={1}
        className="w-[75vw]"
      >
        {Object.entries(gridPositions).map(([position, gridPosition]) => (
          <Tooltip
            {...args}
            key={position}
            position={position as OverlayPosition}
            content={position}
            style={gridPosition}
          >
            <Button isFullWidth>{position}</Button>
          </Tooltip>
        ))}
      </Grid>
    );
  },
};

export const Disabled: Story = {
  args: {
    children: <Button>Hover me (Disabled tooltip)</Button>,
    isDisabled: true,
  },
};
