import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Flex } from './Flex';

describe('[Layouts] Flex', () => {
  it('renders as div with default flex properties', () => {
    render(<Flex testId="flex-default" />);
    const flex = screen.getByTestId('flex-default');

    expect(flex.tagName).toBe('DIV');
    expect(flex).toHaveClass('flex', 'justify-start', 'items-stretch');
    expect(flex).not.toHaveClass('inline-flex');
    expect(flex).toHaveStyle({
      columnGap: 'calc(var(--spacing) * 0)',
      rowGap: 'calc(var(--spacing) * 0)',
    });
  });

  it('renders as a different element with the "as" prop', () => {
    render(<Flex as="nav" testId="flex-nav" />);
    const flex = screen.getByTestId('flex-nav');

    expect(flex.tagName).toBe('NAV');
  });

  it('applies all flex properties correctly', () => {
    render(
      <Flex
        testId="flex-all-props"
        direction="column"
        justifyContent="center"
        alignItems="center"
        wrap="wrap"
        inline
      />,
    );
    const flex = screen.getByTestId('flex-all-props');

    expect(flex).toHaveClass(
      'inline-flex',
      'flex-col',
      'justify-center',
      'items-center',
      'flex-wrap',
    );
    expect(flex).not.toHaveClass('flex');
  });

  it('applies gap styles correctly for number and object values', () => {
    const { rerender } = render(<Flex testId="flex-gap" gap={2} />);
    const flex = screen.getByTestId('flex-gap');

    expect(flex).toHaveStyle({
      columnGap: 'calc(var(--spacing) * 2)',
      rowGap: 'calc(var(--spacing) * 2)',
    });

    rerender(<Flex testId="flex-gap" gap={{ row: 1, column: 3 }} />);

    expect(flex).toHaveStyle({
      columnGap: 'calc(var(--spacing) * 3)',
      rowGap: 'calc(var(--spacing) * 1)',
    });
  });

  it('forwards className and other props', () => {
    render(
      <Flex
        testId="flex-forward"
        label="flex container"
        className="custom-class"
      />,
    );
    const flex = screen.getByTestId('flex-forward');

    expect(flex).toHaveClass('custom-class');
    expect(flex).toHaveAttribute('aria-label', 'flex container');
  });
});
