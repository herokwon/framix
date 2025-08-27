import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import type { ElementSize } from '@types';

import { ICON_SIZES } from '@data';

import Spinner from './Spinner';

describe('[UI] Spinner', () => {
  describe('rendering', () => {
    it('renders with default props (wrapper + svg)', () => {
      render(<Spinner />);
      const wrapper = screen.getByTestId('spinner-wrapper');
      const svg = screen.getByTestId('spinner');
      const circle = svg.querySelector('circle');

      expect(wrapper).toBeInTheDocument();
      expect(wrapper.className).toEqual(
        expect.stringContaining('animate-spin-wrap'),
      );
      expect(wrapper.className).toEqual(
        expect.stringContaining('text-foreground-light'),
      );
      expect(wrapper.className).toEqual(expect.stringContaining('absolute'));
      expect(wrapper.className).toEqual(expect.stringContaining('top-1/2'));
      expect(wrapper.className).toEqual(expect.stringContaining('left-1/2'));
      expect(wrapper.className).toEqual(
        expect.stringContaining('-translate-1/2'),
      );

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('role', 'progressbar');
      expect(svg).toHaveAttribute('aria-label', 'Loading');
      expect(svg).toHaveClass('animate-spin', 'fill-none');
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16');
      expect(svg).toHaveAttribute('width', ICON_SIZES.md.toString());
      expect(svg).toHaveAttribute('height', ICON_SIZES.md.toString());

      expect(circle).toBeInTheDocument();
      expect(circle).toHaveClass('stroke-foreground-light', 'stroke-1');
      expect((circle as SVGCircleElement).style.strokeDasharray).toBe('75');
    });
  });

  describe('position prop', () => {
    it('uses fixed centering for position="global"', () => {
      render(<Spinner position="global" />);
      const wrapper = screen.getByTestId('spinner-wrapper');

      expect(wrapper.className).toEqual(expect.stringContaining('fixed'));
      expect(wrapper.className).toEqual(expect.stringContaining('top-1/2'));
      expect(wrapper.className).toEqual(expect.stringContaining('left-1/2'));
      expect(wrapper.className).toEqual(
        expect.stringContaining('-translate-1/2'),
      );
    });

    it('omits centering classes for position="inline"', () => {
      render(<Spinner position="inline" />);
      const wrapper = screen.getByTestId('spinner-wrapper');

      expect(wrapper.className).not.toEqual(
        expect.stringContaining('absolute'),
      );
      expect(wrapper.className).not.toEqual(expect.stringContaining('fixed'));
      expect(wrapper.className).not.toEqual(
        expect.stringContaining('-translate-1/2'),
      );
    });
  });

  describe('size prop', () => {
    it.each(
      Object.entries(ICON_SIZES) as [
        ElementSize,
        (typeof ICON_SIZES)[keyof typeof ICON_SIZES],
      ][],
    )('sets width/height for size=%s', (size, value) => {
      render(<Spinner size={size} />);
      const svg = screen.getByTestId('spinner');

      expect(svg).toHaveAttribute('width', value.toString());
      expect(svg).toHaveAttribute('height', value.toString());
    });
  });

  describe('a11y & labelling', () => {
    it('applies aria-label to svg role=progressbar', () => {
      render(<Spinner label="Fetching data" />);
      const progress = screen.getByRole('progressbar', {
        name: 'Fetching data',
      });

      expect(progress).toBeInTheDocument();
    });
  });

  describe('testId override', () => {
    it('uses custom testId for wrapper and svg', () => {
      render(<Spinner testId="busy" />);
      const wrapper = screen.getByTestId('busy-wrapper');
      const svg = screen.getByTestId('busy');

      expect(wrapper).toBeInTheDocument();
      expect(svg).toBeInTheDocument();
    });
  });

  describe('prop forwarding', () => {
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
