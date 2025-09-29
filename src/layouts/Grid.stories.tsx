import type { Meta, StoryObj } from '@storybook/react-vite';

import Box from './Box';
import Grid from './Grid';

const meta = {
  title: 'Layouts/Grid',
  component: Grid,
  args: {
    as: 'div',
    justifyContent: 'start',
    alignContent: 'start',
    placeItems: 'stretch',
    gap: 0,
  },
} satisfies Meta<typeof Grid>;
export default meta;

type Story = StoryObj<typeof meta>;

const GridBox = ({
  length,
  prop,
  ...props
}: Parameters<typeof Grid>[0] & {
  length: number;
  prop: { name: string; value: string };
}) => {
  return (
    <Box className="space-y-compact">
      <h3 className="text-lg font-semibold">
        <span className="font-medium">{prop.name}:</span> {prop.value}
      </h3>
      <Grid
        {...props}
        className="border-neutral-light dark:border-neutral-dark p-normal *:text-foreground-dark *:dark:text-foreground-light rounded-md border font-semibold"
      >
        {Array.from({ length }, (_, i) => (
          <Box
            key={i}
            className="bg-primary-light dark:bg-primary-dark border-neutral-light dark:border-neutral-dark flex size-16 items-center justify-center rounded-md border"
          >
            {i + 1}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export const Default: Story = {
  render: () => (
    <Box className="space-y-loose p-loose">
      <GridBox
        length={6}
        prop={{ name: 'Default', value: 'Basic grid layout' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
      />
    </Box>
  ),
};

export const TemplateColumns: Story = {
  render: () => (
    <Box className="space-y-loose p-loose">
      <GridBox
        length={6}
        prop={{ name: 'Template Columns', value: 'repeat(2, 1fr)' }}
        templateColumns={{ repeat: 2, size: '1fr' }}
      />

      <GridBox
        length={9}
        prop={{ name: 'Template Columns', value: 'repeat(3, 1fr)' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
      />

      <GridBox
        length={8}
        prop={{ name: 'Template Columns', value: 'repeat(4, 1fr)' }}
        templateColumns={{ repeat: 4, size: '1fr' }}
      />

      <GridBox
        length={6}
        prop={{
          name: 'Template Columns',
          value: 'auto-fill minmax(100px, 1fr)',
        }}
        templateColumns={{ repeat: 'auto-fill', size: 'minmax(100px, 1fr)' }}
      />

      <GridBox
        length={8}
        prop={{
          name: 'Template Columns',
          value: 'auto-fit minmax(120px, 1fr)',
        }}
        templateColumns={{ repeat: 'auto-fit', size: 'minmax(120px, 1fr)' }}
      />

      <GridBox
        length={6}
        prop={{ name: 'Template Columns', value: 'Custom sizes' }}
        templateColumns={['100px', '1fr', '2fr']}
      />
    </Box>
  ),
};

export const TemplateRows: Story = {
  render: () => (
    <Box className="space-y-loose p-loose">
      <GridBox
        length={6}
        prop={{ name: 'Template Rows', value: 'repeat(2, 100px)' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        templateRows={{ repeat: 2, size: '100px' }}
      />

      <GridBox
        length={9}
        prop={{ name: 'Template Rows', value: 'repeat(3, 80px)' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        templateRows={{ repeat: 3, size: '80px' }}
      />

      <GridBox
        length={6}
        prop={{ name: 'Template Rows', value: 'Custom row sizes' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        templateRows={['60px', '120px']}
      />
    </Box>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <Box className="space-y-loose p-loose *:w-100">
      <GridBox
        length={4}
        prop={{ name: 'JustifyContent', value: 'start' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        justifyContent="start"
      />

      <GridBox
        length={4}
        prop={{ name: 'JustifyContent', value: 'center' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        justifyContent="center"
      />

      <GridBox
        length={4}
        prop={{ name: 'JustifyContent', value: 'end' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        justifyContent="end"
      />

      <GridBox
        length={4}
        prop={{ name: 'JustifyContent', value: 'space-around' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        justifyContent="space-around"
      />

      <GridBox
        length={4}
        prop={{ name: 'JustifyContent', value: 'space-between' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        justifyContent="space-between"
      />

      <GridBox
        length={4}
        prop={{ name: 'JustifyContent', value: 'space-evenly' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        justifyContent="space-evenly"
      />
    </Box>
  ),
};

export const AlignContent: Story = {
  render: () => (
    <Box className="space-y-loose p-loose *:h-60">
      <GridBox
        length={4}
        prop={{ name: 'AlignContent', value: 'start' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        templateRows={{ repeat: 2, size: '60px' }}
        alignContent="start"
      />

      <GridBox
        length={4}
        prop={{ name: 'AlignContent', value: 'center' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        templateRows={{ repeat: 2, size: '60px' }}
        alignContent="center"
      />

      <GridBox
        length={4}
        prop={{ name: 'AlignContent', value: 'end' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        templateRows={{ repeat: 2, size: '60px' }}
        alignContent="end"
      />

      <GridBox
        length={4}
        prop={{ name: 'AlignContent', value: 'stretch' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        alignContent="stretch"
      />

      <GridBox
        length={4}
        prop={{ name: 'AlignContent', value: 'space-around' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        templateRows={{ repeat: 2, size: '60px' }}
        alignContent="space-around"
      />

      <GridBox
        length={4}
        prop={{ name: 'AlignContent', value: 'space-between' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        templateRows={{ repeat: 2, size: '60px' }}
        alignContent="space-between"
      />

      <GridBox
        length={4}
        prop={{ name: 'AlignContent', value: 'space-evenly' }}
        templateColumns={{ repeat: 2, size: '80px' }}
        templateRows={{ repeat: 2, size: '60px' }}
        alignContent="space-evenly"
      />
    </Box>
  ),
};

export const PlaceItems: Story = {
  render: () => (
    <Box className="space-y-loose p-loose">
      <GridBox
        length={6}
        prop={{ name: 'PlaceItems', value: 'start' }}
        templateColumns={{ repeat: 3, size: '100px' }}
        templateRows={{ repeat: 2, size: '100px' }}
        placeItems="start"
      />

      <GridBox
        length={6}
        prop={{ name: 'PlaceItems', value: 'center' }}
        templateColumns={{ repeat: 3, size: '100px' }}
        templateRows={{ repeat: 2, size: '100px' }}
        placeItems="center"
      />

      <GridBox
        length={6}
        prop={{ name: 'PlaceItems', value: 'end' }}
        templateColumns={{ repeat: 3, size: '100px' }}
        templateRows={{ repeat: 2, size: '100px' }}
        placeItems="end"
      />

      <GridBox
        length={6}
        prop={{ name: 'PlaceItems', value: 'stretch' }}
        templateColumns={{ repeat: 3, size: '100px' }}
        templateRows={{ repeat: 2, size: '100px' }}
        placeItems="stretch"
      />

      <GridBox
        length={6}
        prop={{ name: 'PlaceItems', value: 'baseline' }}
        templateColumns={{ repeat: 3, size: '100px' }}
        templateRows={{ repeat: 2, size: '100px' }}
        placeItems="baseline"
      />
    </Box>
  ),
};

export const Gap: Story = {
  render: () => (
    <Box className="space-y-loose p-loose">
      <GridBox
        length={6}
        prop={{ name: 'Gap', value: 'No gap (0)' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        gap={0}
      />

      <GridBox
        length={6}
        prop={{ name: 'Gap', value: 'Uniform gap (1)' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        gap={1}
      />

      <GridBox
        length={6}
        prop={{ name: 'Gap', value: 'Uniform gap (2)' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        gap={2}
      />

      <GridBox
        length={6}
        prop={{ name: 'Gap', value: 'Row gap only' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        gap={{ row: 2, column: 0 }}
      />

      <GridBox
        length={6}
        prop={{ name: 'Gap', value: 'Column gap only' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        gap={{ row: 0, column: 2 }}
      />

      <GridBox
        length={6}
        prop={{ name: 'Gap', value: 'Different row/column gaps' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        gap={{ row: 3, column: 1 }}
      />
    </Box>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Box className="space-y-loose p-loose">
      <GridBox
        length={12}
        prop={{ name: 'Responsive', value: 'Auto-fill responsive' }}
        templateColumns={{ repeat: 'auto-fill', size: 'minmax(150px, 1fr)' }}
        gap={1}
      />

      <GridBox
        length={8}
        prop={{ name: 'Responsive', value: 'Auto-fit responsive' }}
        templateColumns={{ repeat: 'auto-fit', size: 'minmax(120px, 1fr)' }}
        gap={2}
      />
    </Box>
  ),
};

export const ComplexLayouts: Story = {
  render: () => (
    <Box className="space-y-loose p-loose">
      <GridBox
        length={7}
        prop={{ name: 'Complex', value: 'Mixed column sizes' }}
        templateColumns={['100px', '1fr', '2fr', '100px']}
        gap={1}
      />

      <GridBox
        length={6}
        prop={{ name: 'Complex', value: 'Mixed row heights' }}
        templateColumns={{ repeat: 3, size: '1fr' }}
        templateRows={['60px', '120px']}
        gap={1}
      />

      <GridBox
        length={9}
        prop={{ name: 'Complex', value: 'Card grid layout' }}
        templateColumns={{ repeat: 'auto-fit', size: 'minmax(200px, 1fr)' }}
        gap={2}
        placeItems="stretch"
      />
    </Box>
  ),
};

export const Combined: Story = {
  render: () => (
    <Box className="space-y-loose p-loose">
      <GridBox
        length={6}
        prop={{ name: 'Combined', value: 'Center + Place-items center + Gap' }}
        templateColumns={{ repeat: 3, size: '120px' }}
        templateRows={{ repeat: 2, size: '120px' }}
        justifyContent="center"
        alignContent="center"
        placeItems="center"
        gap={2}
        className="h-80"
      />

      <GridBox
        length={8}
        prop={{ name: 'Combined', value: 'Space-between + Stretch + Auto-fit' }}
        templateColumns={{ repeat: 'auto-fit', size: 'minmax(100px, 1fr)' }}
        justifyContent="space-between"
        placeItems="stretch"
        gap={1}
      />
    </Box>
  ),
};
