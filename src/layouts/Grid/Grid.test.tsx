import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Grid } from './Grid';

describe('[Layouts] Grid', () => {
  it('renders as div with default grid properties', () => {
    render(<Grid testId="grid-default" />);
    const grid = screen.getByTestId('grid-default');

    expect(grid.tagName).toBe('DIV');
    expect(grid).toHaveClass('grid', 'justify-start', 'place-items-stretch');
    expect(grid.style.gridTemplateColumns).toBe('');
    expect(grid.style.gridTemplateRows).toBe('');
    expect(grid).toHaveStyle({
      columnGap: 'calc(var(--spacing) * 0)',
      rowGap: 'calc(var(--spacing) * 0)',
    });
  });

  it('renders as a different element with the "as" prop', () => {
    render(<Grid as="main" testId="grid-main" />);
    const grid = screen.getByTestId('grid-main');
    expect(grid.tagName).toBe('MAIN');
  });

  it('applies template styles correctly for object and array values', () => {
    const { rerender } = render(
      <Grid
        testId="grid-template"
        templateColumns={{ repeat: 'auto-fit', size: '100px' }}
      />,
    );
    const grid = screen.getByTestId('grid-template');

    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(auto-fit, 100px)',
    });

    rerender(<Grid testId="grid-template" templateRows={['1fr', '2fr']} />);

    expect(grid).toHaveStyle({ gridTemplateRows: '1fr 2fr' });
  });

  it('applies all alignment and gap properties correctly', () => {
    render(
      <Grid
        testId="grid-all-props"
        justifyContent="center"
        alignContent="center"
        placeItems="center"
        gap={{ row: 1, column: 2 }}
      />,
    );
    const grid = screen.getByTestId('grid-all-props');

    expect(grid).toHaveClass(
      'justify-center',
      'content-center',
      'place-items-center',
    );
    expect(grid).toHaveStyle({
      rowGap: 'calc(var(--spacing) * 1)',
      columnGap: 'calc(var(--spacing) * 2)',
    });
  });

  it('forwards className and other props', () => {
    render(
      <Grid
        testId="grid-forward"
        label="grid container"
        className="custom-class"
      />,
    );
    const grid = screen.getByTestId('grid-forward');

    expect(grid).toHaveClass('custom-class');
    expect(grid).toHaveAttribute('aria-label', 'grid container');
  });
});
