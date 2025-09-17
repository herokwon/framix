import { render, screen } from '@testing-library/react';

import { ELEMENT_COLORS } from '@data';

import Alert from './Alert';

const COLORS = ELEMENT_COLORS.filter(color => color !== 'primary');

describe('[UI] Alert', () => {
  describe('rendering', () => {
    it('renders with default props (variant=text, color=default)', () => {
      render(<Alert>Message</Alert>);
      const alert = screen.getByRole('alert');
      const icon = screen.getByRole('img', { hidden: true });
      const text = screen.getByTestId('text');

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('bg-secondary-light dark:bg-secondary-dark');
      expect(alert).toHaveClass('px-4 py-2');

      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveAttribute('focusable', 'false');

      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveTextContent('Message');
    });
  });

  describe('variant', () => {
    it('applies outlined padding and border tokens', () => {
      render(
        <Alert variant="outlined" color="success">
          Outlined
        </Alert>,
      );
      const alert = screen.getByRole('alert');

      expect(alert).toHaveClass('border', 'px-3.75 py-1.75');
      expect(alert).toHaveClass(
        'border-success-light dark:border-success-dark',
      );
      expect(alert).toHaveClass(
        'bg-success-background-light dark:bg-success-background-dark',
      );
    });

    it('applies filled background tokens and text weight', () => {
      render(
        <Alert variant="filled" color="success">
          Filled Success
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      const text = screen.getByTestId('text');

      expect(alert).toHaveClass('bg-success-light dark:bg-success-dark');

      expect(text).toHaveTextContent('Filled Success');
      expect(text).toHaveClass(
        'text-foreground-dark dark:text-foreground-light',
      );
      expect(text).toHaveClass('font-semibold');
    });

    it('filled + default does NOT invert text color', () => {
      render(
        <Alert variant="filled" color="default">
          Filled Default
        </Alert>,
      );
      const text = screen.getByTestId('text');

      expect(text).toHaveClass(
        'text-foreground-light dark:text-foreground-dark',
      );
    });

    it('filled + warning keeps explicit override class', () => {
      render(
        <Alert variant="filled" color="warning">
          Warn
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      const text = screen.getByTestId('text');

      expect(alert).toHaveClass('bg-warning-light');

      expect(text).toHaveClass('text-foreground-light!');
      expect(text).not.toHaveClass('text-foreground-dark');
    });
  });

  describe('color', () => {
    it.each(COLORS)(
      'applies background token for color=%s (variant=text)',
      color => {
        render(<Alert color={color}>{color}</Alert>);
        const alert = screen.getByRole('alert');

        expect(alert).toHaveClass(
          color === 'default'
            ? 'bg-secondary-light'
            : `bg-${color}-background-light`,
        );
      },
    );
  });

  describe('outlined borders per color', () => {
    it.each(COLORS)('applies outlined border token for color=%s', color => {
      render(
        <Alert variant="outlined" color={color}>
          {color}
        </Alert>,
      );
      const alert = screen.getByRole('alert');

      expect(alert).toHaveClass(
        color === 'default'
          ? 'border-foreground-light'
          : `border-${color}-light`,
      );
    });
  });
});
