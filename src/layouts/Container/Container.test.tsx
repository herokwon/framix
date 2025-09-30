import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Container } from './Container';

describe('[Layouts] Container', () => {
  it('should render as a "section" element with children by default', () => {
    render(<Container testId="container">Default Content</Container>);
    const container = screen.getByTestId('container');

    expect(container.tagName).toBe('SECTION');
    expect(container).toHaveTextContent('Default Content');
    expect(container).toHaveClass('w-full');
  });

  it('should render as a different element when "as" prop is provided', () => {
    render(
      <Container as="main" testId="container">
        Main Content
      </Container>,
    );
    const container = screen.getByTestId('container');

    expect(container.tagName).toBe('MAIN');
    expect(container).toHaveTextContent('Main Content');
  });

  it('should apply fixed container styles when "fixed" is true', () => {
    render(<Container fixed={true} testId="container" />);
    const container = screen.getByTestId('container');

    expect(container).toHaveClass('container');
    expect(container).not.toHaveClass('w-full');
  });

  it('should apply max-width styles when "maxWidth" is specified', () => {
    render(<Container maxWidth="lg" testId="container" />);
    const container = screen.getByTestId('container');

    expect(container).toHaveClass('lg:max-w-5xl');
    expect(container).not.toHaveClass('w-full');
  });

  it('should forward className and other props to the element', () => {
    render(
      <Container
        testId="container"
        id="custom-id"
        className="custom-class"
        title="Custom Title"
      >
        Content
      </Container>,
    );
    const container = screen.getByTestId('container');

    expect(container).toHaveClass('w-full', 'custom-class');
    expect(container).toHaveAttribute('id', 'custom-id');
    expect(container).toHaveAttribute('title', 'Custom Title');
  });

  it('should handle user events like click', async () => {
    const handleClick = vi.fn();
    render(
      <Container testId="container" onClick={handleClick}>
        Clickable
      </Container>,
    );
    const container = screen.getByTestId('container');

    await userEvent.click(container);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should support ARIA attributes for accessibility', () => {
    render(
      <Container testId="container" label="Accessible Name">
        Content
      </Container>,
    );
    const container = screen.getByTestId('container');

    expect(container).toHaveAttribute('aria-label', 'Accessible Name');
  });
});
