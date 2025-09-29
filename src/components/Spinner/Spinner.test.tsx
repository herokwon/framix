import { render, screen } from '@testing-library/react';

import type { ElementSize } from '@types';

import { ICON_SIZES } from '@data';

import { Spinner } from './Spinner';

describe('[Components] Spinner', () => {
  describe('rendering', () => {
    it('renders with default', () => {
      render(<Spinner />);
      const wrapper = screen.getByTestId('spinner-wrapper');
      const icon = screen.getByRole('progressbar');
      const circle = icon.querySelector('circle');

      expect(wrapper).toBeInTheDocument();
      expect(wrapper.tagName).toBe('SPAN');

      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
      expect(icon).toHaveAttribute('role', 'progressbar');
      expect(icon).toHaveAttribute('aria-label', 'Loading');
      expect(icon).toHaveAttribute('focusable', 'false');
      expect(icon).toHaveAttribute('width', ICON_SIZES.md.toString());
      expect(icon).toHaveAttribute('height', ICON_SIZES.md.toString());

      expect(circle).toBeInTheDocument();
      expect(circle).toHaveClass('stroke-foreground-light', 'stroke-1');
      expect(circle).toHaveStyle({
        strokeDasharray: '75',
      });
    });
  });

  describe('position', () => {
    it('uses fixed centering for global position', () => {
      render(<Spinner position="global" />);
      const wrapper = screen.getByTestId('spinner-wrapper');

      expect(wrapper).toHaveClass('fixed top-1/2 left-1/2 -translate-1/2');
    });

    it('omits centering classes for inline position', () => {
      render(<Spinner position="inline" />);
      const wrapper = screen.getByTestId('spinner-wrapper');

      expect(wrapper).not.toHaveClass('absolute');
      expect(wrapper).not.toHaveClass('fixed');
    });
  });

  describe('size', () => {
    it.each(
      Object.entries(ICON_SIZES) as [
        ElementSize,
        (typeof ICON_SIZES)[keyof typeof ICON_SIZES],
      ][],
    )('sets width/height for size=%s', (size, value) => {
      render(<Spinner size={size} />);
      const icon = screen.getByRole('progressbar');

      expect(icon).toHaveAttribute('width', value.toString());
      expect(icon).toHaveAttribute('height', value.toString());
    });
  });

  describe('prop forwarding', () => {
    it('applies aria-label to svg role=progressbar', () => {
      render(<Spinner label="Fetching data" />);
      const progress = screen.getByRole('progressbar', {
        name: 'Fetching data',
      });

      expect(progress).toBeInTheDocument();
    });

    it('uses custom testId for wrapper and svg', () => {
      render(<Spinner testId="busy" />);
      const wrapper = screen.getByTestId('busy-wrapper');
      const icon = screen.getByTestId('busy');

      expect(wrapper).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });

    it('merges className and forwards data attributes', () => {
      render(
        <Spinner className="rounded p-2" data-analytics="spin" testId="s" />,
      );
      const wrapper = screen.getByTestId('s-wrapper');

      expect(wrapper).toHaveClass('p-2', 'rounded');
      expect(wrapper).toHaveAttribute('data-analytics', 'spin');
    });
  });
});
