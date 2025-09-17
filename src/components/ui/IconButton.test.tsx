import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Circle } from 'lucide-react';

import { ICON_SIZES } from '@data';

import IconButton from './IconButton';

describe('[UI] IconButton', () => {
  describe('rendering', () => {
    it('renders with default', () => {
      render(<IconButton icon={Circle} />);
      const button = screen.getByRole('button');
      const icon = screen.getByRole('img', { hidden: true });

      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-label', 'Icon Button');
      expect(button).not.toBeDisabled();

      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveAttribute('focusable', 'false');
      expect(icon).toHaveAttribute('width', ICON_SIZES.md.toString());
      expect(icon).toHaveAttribute('height', ICON_SIZES.md.toString());
    });

    it('renders with explicit type, testId and label', () => {
      render(
        <IconButton icon={Circle} type="submit" testId="ib" label="Add" />,
      );
      const button = screen.getByTestId('ib');

      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('aria-label', 'Add');
    });
  });

  describe('variant & color', () => {
    it('maps variant="icon" to text styles', () => {
      render(<IconButton icon={Circle} variant="icon" />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('hover:not-disabled:bg-secondary-light');
    });

    it('applies filled + primary styles', () => {
      render(<IconButton icon={Circle} variant="filled" color="primary" />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('bg-primary-light dark:bg-primary-dark');
    });

    it('applies outlined + default styles', () => {
      render(<IconButton icon={Circle} variant="outlined" color="default" />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(
        'border border-foreground-light/38 dark:border-foreground-dark/38',
      );
    });
  });

  describe('size', () => {
    it('size=sm sets width and icon size', () => {
      render(<IconButton icon={Circle} size="sm" />);
      const button = screen.getByRole('button');
      const icon = screen.getByRole('img', { hidden: true });

      expect(button).toHaveClass('w-6');

      expect(icon).toHaveAttribute('width', ICON_SIZES.sm.toString());
      expect(icon).toHaveAttribute('height', ICON_SIZES.sm.toString());
    });

    it('size=lg sets width and icon size', () => {
      render(<IconButton icon={Circle} size="lg" />);
      const button = screen.getByRole('button');
      const icon = screen.getByRole('img', { hidden: true });

      expect(button).toHaveClass('w-10');

      expect(icon).toHaveAttribute('width', ICON_SIZES.lg.toString());
      expect(icon).toHaveAttribute('height', ICON_SIZES.lg.toString());
    });
  });

  describe('status', () => {
    it('disabled prevents click', async () => {
      const onClick = vi.fn();
      render(<IconButton icon={Circle} isDisabled onClick={onClick} />);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();

      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('selected adds active class', () => {
      render(<IconButton icon={Circle} isSelected />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('active');
    });

    it('loading shows overlay spinner and hides other contents', () => {
      render(<IconButton icon={Circle} isLoading />);

      const button = screen.getByRole('button');
      const spinnerWrapper = screen.getByTestId('spinner-wrapper');
      const progress = screen.getByRole('progressbar', { name: 'Loading' });
      const svgs = button.querySelectorAll('svg');

      expect(button).toHaveClass(
        '*:not-[[data-testid="spinner-wrapper"]]:opacity-0',
      );

      expect(spinnerWrapper).toBeInTheDocument();
      expect(spinnerWrapper).toHaveClass('absolute');

      expect(progress).toBeInTheDocument();
      expect(progress).toHaveClass('animate-spin');

      expect(svgs.length).toBe(2);
    });
  });

  describe('shape', () => {
    it('uses rounded by default for shape=circle and rounded for square', () => {
      const { rerender } = render(<IconButton icon={Circle} />);
      let button = screen.getByRole('button');

      expect(button).toHaveClass('rounded-full');

      rerender(<IconButton icon={Circle} shape="square" />);
      button = screen.getByRole('button');

      expect(button).toHaveClass('rounded');
      expect(button).not.toHaveClass('rounded-full');
    });
  });

  describe('events & prop forwarding', () => {
    it('merges className and forwards data attributes', () => {
      render(
        <IconButton icon={Circle} className="ring-1" data-analytics="icon" />,
      );
      const button = screen.getByRole('button');

      expect(button).toHaveClass('ring-1');
      expect(button).toHaveAttribute('data-analytics', 'icon');
    });

    it('fires onClick when enabled', async () => {
      const onClick = vi.fn();
      render(<IconButton icon={Circle} onClick={onClick} />);
      const button = screen.getByTestId('icon-button');

      await userEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Enter and Space keys', async () => {
      const onClick = vi.fn();
      render(<IconButton icon={Circle} onClick={onClick} />);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });
});
