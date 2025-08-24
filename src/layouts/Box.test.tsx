import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Box from './Box';

describe('[Layouts] Box', () => {
  describe('rendering', () => {
    it('renders as div by default', () => {
      render(<Box data-testid="box">Content</Box>);
      const box = screen.getByTestId('box');

      expect(box.tagName).toBe('DIV');
      expect(box).toHaveTextContent('Content');
    });

    it('renders with custom className', () => {
      render(
        <Box data-testid="box" className="rounded-md border p-4">
          Content
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box).toHaveClass('p-4', 'rounded-md', 'border');
    });

    it('renders children correctly', () => {
      render(
        <Box data-testid="box">
          <span>Child 1</span>
          <span>Child 2</span>
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box).toHaveTextContent('Child 1');
      expect(box).toHaveTextContent('Child 2');
    });
  });

  describe('polymorphic behavior', () => {
    it('renders as button when as="button"', () => {
      render(
        <Box as="button" data-testid="box">
          Click me
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box.tagName).toBe('BUTTON');
      expect(box).toHaveTextContent('Click me');
    });

    it('renders as anchor when as="a"', () => {
      render(
        <Box
          as="a"
          href="https://example.com"
          target="_blank"
          data-testid="box"
        >
          Go to example.com
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box.tagName).toBe('A');
      expect(box).toHaveAttribute('href', 'https://example.com');
      expect(box).toHaveAttribute('target', '_blank');
      expect(box).toHaveTextContent('Go to example.com');
    });

    it('renders as header when as="header"', () => {
      render(
        <Box as="header" data-testid="box">
          Header content
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box.tagName).toBe('HEADER');
      expect(box).toHaveTextContent('Header content');
    });

    it('renders as main when as="main"', () => {
      render(
        <Box as="main" data-testid="box">
          Main content
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box.tagName).toBe('MAIN');
      expect(box).toHaveTextContent('Main content');
    });

    it('renders as aside when as="aside"', () => {
      render(
        <Box as="aside" data-testid="box">
          Aside content
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box.tagName).toBe('ASIDE');
      expect(box).toHaveTextContent('Aside content');
    });

    it('renders as footer when as="footer"', () => {
      render(
        <Box as="footer" data-testid="box">
          Footer content
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box.tagName).toBe('FOOTER');
      expect(box).toHaveTextContent('Footer content');
    });
  });

  describe('event handling', () => {
    it('handles click events when rendered as button', async () => {
      const handleClick = vi.fn();
      render(
        <Box as="button" onClick={handleClick} data-testid="box">
          Click me
        </Box>,
      );
      const button = screen.getByTestId('box');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveTextContent('Click me');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse events', async () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      render(
        <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-testid="box"
        >
          Hover me
        </Box>,
      );
      const box = screen.getByTestId('box');

      await userEvent.hover(box);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      await userEvent.unhover(box);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('supports aria attributes', () => {
      render(
        <Box
          aria-label="Custom box"
          aria-describedby="description"
          data-testid="box"
        >
          Content
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box).toHaveAttribute('aria-label', 'Custom box');
      expect(box).toHaveAttribute('aria-describedby', 'description');
      expect(box).toHaveTextContent('Content');
    });

    it('supports role attribute', () => {
      render(
        <Box role="banner" data-testid="box">
          Banner content
        </Box>,
      );
      const box = screen.getByTestId('box');

      expect(box).toHaveAttribute('role', 'banner');
      expect(box).toHaveTextContent('Banner content');
    });
  });

  describe('complex content', () => {
    it('renders nested Box components correctly', () => {
      render(
        <Box data-testid="parent">
          <Box as="header" data-testid="header">
            Header
          </Box>
          <Box as="main" data-testid="main">
            <Box as="ul" data-testid="list">
              <li>Item 1</li>
              <li>Item 2</li>
            </Box>
          </Box>
          <Box as="footer" data-testid="footer">
            Footer
          </Box>
        </Box>,
      );
      const parent = screen.getByTestId('parent');
      const header = screen.getByTestId('header');
      const main = screen.getByTestId('main');
      const list = screen.getByTestId('list');
      const footer = screen.getByTestId('footer');

      expect(parent.tagName).toBe('DIV');
      expect(header.tagName).toBe('HEADER');
      expect(main.tagName).toBe('MAIN');
      expect(list.tagName).toBe('UL');
      expect(footer.tagName).toBe('FOOTER');

      expect(parent).toContainElement(header);
      expect(parent).toContainElement(main);
      expect(parent).toContainElement(footer);
      expect(main).toContainElement(list);
    });
  });

  describe('prop forwarding', () => {
    it('forwards all props to the underlying element', () => {
      render(
        <Box
          as="input"
          type="text"
          placeholder="Enter text"
          disabled
          data-testid="box"
        />,
      );
      const input = screen.getByTestId('box');

      expect(input.tagName).toBe('INPUT');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
      expect(input).toBeDisabled();
    });

    it('forwards data attributes', () => {
      render(
        <Box data-testid="box" data-custom="value" data-analytics="track">
          Content
        </Box>,
      );

      const box = screen.getByTestId('box');

      expect(box).toHaveAttribute('data-custom', 'value');
      expect(box).toHaveAttribute('data-analytics', 'track');
      expect(box).toHaveTextContent('Content');
    });
  });
});
