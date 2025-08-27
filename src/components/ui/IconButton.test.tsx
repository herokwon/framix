import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Circle } from 'lucide-react';

import { ICON_SIZES } from '@data';

import IconButton from './IconButton';

describe('[UI] IconButton', () => {
  describe('rendering', () => {
    it('renders with default props and icon', () => {
      render(<IconButton icon={Circle} />);
      const btn = screen.getByTestId('icon-button');
      const svg = btn.querySelector('svg');

      expect(btn.tagName).toBe('BUTTON');
      expect(btn).toHaveAttribute('type', 'button');
      expect(btn).toHaveAttribute('aria-label', 'Icon Button');
      expect(btn).not.toBeDisabled();
      expect(btn).toHaveClass(
        'flex',
        'items-center',
        'justify-center',
        'rounded-full',
      );
      expect(btn.className).toEqual(expect.stringContaining('w-8'));
      expect(btn.className).toEqual(expect.stringContaining('p-0!'));

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', ICON_SIZES.md.toString());
      expect(svg).toHaveAttribute('height', ICON_SIZES.md.toString());
    });

    it('respects explicit type, testId and label', () => {
      render(
        <IconButton icon={Circle} type="submit" testId="ib" label="Add" />,
      );
      const btn = screen.getByTestId('ib');

      expect(btn).toHaveAttribute('type', 'submit');
      expect(screen.getByRole('button', { name: 'Add' })).toBe(btn);
    });
  });

  describe('variant & color', () => {
    it('maps variant="icon" to text styles', () => {
      render(<IconButton icon={Circle} variant="icon" />);
      const btn = screen.getByTestId('icon-button');

      expect(btn.className).toEqual(
        expect.stringContaining('hover:not-disabled:bg-secondary-light'),
      );
      expect(btn.className).not.toEqual(expect.stringContaining('border-'));
    });

    it('applies filled + primary styles', () => {
      render(<IconButton icon={Circle} variant="filled" color="primary" />);
      const btn = screen.getByTestId('icon-button');

      expect(btn.className).toEqual(
        expect.stringContaining('bg-primary-light'),
      );
    });

    it('applies outlined + default styles', () => {
      render(<IconButton icon={Circle} variant="outlined" color="default" />);
      const btn = screen.getByTestId('icon-button');

      expect(btn).toHaveClass('border');
      expect(btn.className).toEqual(
        expect.stringContaining('border-foreground-light/38'),
      );
    });
  });

  describe('sizes', () => {
    it('size=sm sets width and icon size', () => {
      render(<IconButton icon={Circle} size="sm" />);
      const btn = screen.getByTestId('icon-button');
      const svg = btn.querySelector('svg');

      expect(btn.className).toEqual(expect.stringContaining('w-6'));

      expect(svg).toHaveAttribute('width', ICON_SIZES.sm.toString());
      expect(svg).toHaveAttribute('height', ICON_SIZES.sm.toString());
    });

    it('size=lg sets width and icon size', () => {
      render(<IconButton icon={Circle} size="lg" />);
      const btn = screen.getByTestId('icon-button');
      const svg = btn.querySelector('svg');

      expect(btn.className).toEqual(expect.stringContaining('w-10'));

      expect(svg).toHaveAttribute('width', ICON_SIZES.lg.toString());
      expect(svg).toHaveAttribute('height', ICON_SIZES.lg.toString());
    });
  });

  describe('states', () => {
    it('disabled prevents click', async () => {
      const onClick = vi.fn();
      render(<IconButton icon={Circle} isDisabled onClick={onClick} />);
      const btn = screen.getByTestId('icon-button');

      expect(btn).toBeDisabled();

      await userEvent.click(btn);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('selected adds active class', () => {
      render(<IconButton icon={Circle} isSelected />);
      const btn = screen.getByTestId('icon-button');

      expect(btn.className.split(' ')).toContain('active');
    });

    it('loading shows overlay spinner and hides other contents', () => {
      render(<IconButton icon={Circle} isLoading />);

      const btn = screen.getByTestId('icon-button');
      const wrapper = screen.getByTestId('spinner-wrapper');
      const progress = screen.getByRole('progressbar', { name: 'Loading' });
      const svgs = btn.querySelectorAll('svg');

      expect(wrapper).toBeInTheDocument();
      expect(wrapper.className).toEqual(expect.stringContaining('absolute'));
      expect(progress).toBeInTheDocument();

      expect(btn.className).toEqual(
        expect.stringContaining(
          '*:not-[[data-testid="spinner-wrapper"]]:opacity-0',
        ),
      );

      expect(svgs.length).toBe(2);
    });
  });

  describe('shape', () => {
    it('uses rounded by default for shape=circle and rounded for square', () => {
      const { rerender } = render(<IconButton icon={Circle} />);
      let btn = screen.getByTestId('icon-button');

      expect(btn).toHaveClass('rounded-full');

      rerender(<IconButton icon={Circle} shape="square" />);
      btn = screen.getByTestId('icon-button');

      expect(btn).toHaveClass('rounded');
      expect(btn).not.toHaveClass('rounded-full');
    });
  });

  describe('prop forwarding', () => {
    it('merges className and forwards data attributes', () => {
      render(
        <IconButton icon={Circle} className="ring-1" data-analytics="icon" />,
      );
      const btn = screen.getByTestId('icon-button');

      expect(btn).toHaveClass('ring-1');
      expect(btn).toHaveAttribute('data-analytics', 'icon');
    });

    it('supports custom testId and label', () => {
      render(<IconButton icon={Circle} testId="ib" label="More" />);
      const btn = screen.getByTestId('ib');

      expect(screen.getByRole('button', { name: 'More' })).toBe(btn);
    });
  });

  describe('events', () => {
    it('fires onClick when enabled', async () => {
      const onClick = vi.fn();
      render(<IconButton icon={Circle} onClick={onClick} />);
      const btn = screen.getByTestId('icon-button');

      await userEvent.click(btn);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Enter and Space keys', async () => {
      const onClick = vi.fn();
      render(<IconButton icon={Circle} onClick={onClick} />);
      const btn = screen.getByTestId('icon-button');

      btn.focus();
      expect(btn).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });
});
