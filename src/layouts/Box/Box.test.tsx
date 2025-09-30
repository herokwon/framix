import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Box } from './Box';

describe('[Layouts] Box', () => {
  it('should render as a "div" element with children by default', () => {
    render(<Box testId="box">Default Content</Box>);
    const box = screen.getByTestId('box');

    expect(box.tagName).toBe('DIV');
    expect(box).toHaveTextContent('Default Content');
  });

  it('should render as a different element when "as" prop is provided', () => {
    render(
      <Box as="button" testId="box">
        Button
      </Box>,
    );
    const box = screen.getByTestId('box');

    expect(box.tagName).toBe('BUTTON');
    expect(box).toHaveTextContent('Button');
  });

  it('should forward className and other props to the element', () => {
    render(
      <Box
        testId="box"
        id="custom-id"
        className="custom-class"
        title="Custom Title"
      >
        Content
      </Box>,
    );
    const box = screen.getByTestId('box');

    expect(box).toHaveClass('custom-class');
    expect(box).toHaveAttribute('id', 'custom-id');
    expect(box).toHaveAttribute('title', 'Custom Title');
  });

  it('should handle user events like click', async () => {
    const handleClick = vi.fn();
    render(
      <Box as="button" testId="box" onClick={handleClick}>
        Clickable
      </Box>,
    );
    const box = screen.getByTestId('box');

    await userEvent.click(box);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should support ARIA attributes for accessibility from the "label" prop', () => {
    render(
      <Box testId="box" label="Accessible Name">
        Content
      </Box>,
    );
    const box = screen.getByTestId('box');

    expect(box).toHaveAttribute('aria-label', 'Accessible Name');
  });
});
