import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Circle, Square } from 'lucide-react';

import { ICON_SIZES } from '@data';

import Button from './Button';

describe('[UI] Button', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const btn = screen.getByTestId('button');
      const text = btn.querySelector('span.text-body2.font-medium');

      expect(btn.tagName).toBe('BUTTON');
      expect(btn).toHaveAttribute('type', 'button');
      expect(btn).toHaveAttribute('aria-label', 'Button');
      expect(btn).not.toBeDisabled();
      expect(btn).toHaveClass(
        'flex',
        'cursor-pointer',
        'items-center',
        'justify-center',
        'rounded',
        'transition-all',
        'outline-none',
        'whitespace-nowrap',
        'h-8',
        'gap-x-2',
        'px-4',
      );
      expect(btn.className).toEqual(
        expect.stringContaining('bg-secondary-light'),
      );

      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent('Click me');
    });

    it('respects explicit type prop', () => {
      render(<Button type="submit">Send</Button>);
      const btn = screen.getByTestId('button');

      expect(btn).toHaveAttribute('type', 'submit');
    });
  });

  describe('variant & color', () => {
    it('applies filled + primary styles', () => {
      render(
        <Button variant="filled" color="primary">
          Filled Primary
        </Button>,
      );
      const btn = screen.getByTestId('button');

      expect(btn.className).toEqual(
        expect.stringContaining('bg-primary-light'),
      );
      expect(btn.className).toEqual(
        expect.stringContaining('text-foreground-dark'),
      );
    });

    it('applies outlined + default styles', () => {
      render(
        <Button variant="outlined" color="default">
          Outlined Default
        </Button>,
      );
      const btn = screen.getByTestId('button');

      expect(btn).toHaveClass('border');
      expect(btn.className).toEqual(
        expect.stringContaining('border-foreground-light/38'),
      );
      expect(btn.className).toEqual(
        expect.stringContaining('text-foreground-light'),
      );
      expect(btn.className).toEqual(expect.stringContaining('px-3.75'));
    });

    it('applies text + success styles', () => {
      render(
        <Button variant="text" color="success">
          Text Success
        </Button>,
      );
      const btn = screen.getByTestId('button');

      expect(btn.className).toEqual(
        expect.stringContaining('text-success-light'),
      );
      expect(btn.className).toEqual(
        expect.stringContaining(
          'hover:not-disabled:bg-success-background-light',
        ),
      );
      expect(btn.className).not.toEqual(expect.stringContaining('border-'));
    });

    it('applies filled + warning special text color and bg tokens', () => {
      render(
        <Button variant="filled" color="warning">
          Warn
        </Button>,
      );
      const btn = screen.getByTestId('button');

      expect(btn.className).toEqual(
        expect.stringContaining('text-foreground-light'),
      );
      expect(btn.className).toEqual(
        expect.stringContaining('bg-warning-light'),
      );
      expect(btn.className).toEqual(
        expect.stringContaining('dark:bg-warning-dark'),
      );
    });
  });

  describe('sizes', () => {
    it('applies sm sizing and icon size', () => {
      render(
        <Button size="sm" leftIcon={Circle}>
          Small
        </Button>,
      );
      const btn = screen.getByTestId('button');
      const icon = btn.querySelector('svg');

      expect(btn).toHaveClass('h-6', 'gap-x-1.5');
      expect(btn.className).toEqual(expect.stringContaining('px-3'));

      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('width', ICON_SIZES.sm.toString());
      expect(icon).toHaveAttribute('height', ICON_SIZES.sm.toString());
    });

    it('applies lg sizing paddings', () => {
      render(<Button size="lg">Large</Button>);
      const btn = screen.getByTestId('button');

      expect(btn).toHaveClass('h-10', 'gap-x-2.5');
      expect(btn.className).toEqual(expect.stringContaining('px-5'));
    });
  });

  describe('shape', () => {
    it('applies circle shape', () => {
      render(
        <Button shape="circle" leftIcon={Circle} rightIcon={Square}>
          Circle
        </Button>,
      );
      const btn = screen.getByTestId('button');

      expect(btn.className.split(' ')).toContain('rounded-full');
    });

    it('applies square shape', () => {
      render(
        <Button shape="square" leftIcon={Circle} rightIcon={Square}>
          Square
        </Button>,
      );
      const btn = screen.getByTestId('button');

      expect(btn.className.split(' ')).toContain('rounded');
      expect(btn.className.split(' ')).not.toContain('rounded-full');
    });
  });

  describe('wrapping', () => {
    it('uses nowrap by default and flex-wrap when allowWrap=true', () => {
      const { rerender } = render(<Button>Text</Button>);
      let btn = screen.getByTestId('button');

      expect(btn.className).toEqual(
        expect.stringContaining('whitespace-nowrap'),
      );

      rerender(
        <Button allowWrap>
          This is a button with a very long text that should wrap onto multiple
          lines
        </Button>,
      );
      btn = screen.getByTestId('button');

      expect(btn.className).toEqual(expect.stringContaining('flex-wrap'));
    });
  });

  describe('states', () => {
    it('disabled blocks clicks', async () => {
      const onClick = vi.fn();
      render(
        <Button isDisabled onClick={onClick}>
          Disabled
        </Button>,
      );
      const btn = screen.getByTestId('button');

      expect(btn).toBeDisabled();

      await userEvent.click(btn);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('selected adds active class token', () => {
      render(<Button isSelected>Selected</Button>);
      const btn = screen.getByTestId('button');

      expect(btn.className.split(' ')).toContain('active');
    });

    it('loading without icons shows overlay spinner and hides others', () => {
      render(<Button isLoading>Loading</Button>);
      const btn = screen.getByTestId('button');
      const wrapper = screen.getByTestId('spinner-wrapper');
      const progress = screen.getByRole('progressbar', { name: 'Loading' });

      expect(btn.className).toEqual(
        expect.stringContaining('pointer-events-none'),
      );
      expect(btn.className).toEqual(
        expect.stringContaining('opacity-text-disabled'),
      );
      expect(btn.className).toEqual(
        expect.stringContaining(
          '*:not-[[data-testid="spinner-wrapper"]]:opacity-0',
        ),
      );

      expect(wrapper).toBeInTheDocument();
      expect(progress).toBeInTheDocument();
    });

    it('loading with one icon replaces icon with inline spinner', () => {
      render(
        <Button isLoading leftIcon={Circle}>
          Loading
        </Button>,
      );
      const btn = screen.getByTestId('button');
      const svgs = btn.querySelectorAll('svg');
      const wrapper = screen.getByTestId('spinner-wrapper');

      expect(btn.className).not.toEqual(
        expect.stringContaining(
          '*:not-[[data-testid="spinner-wrapper"]]:opacity-0',
        ),
      );
      expect(svgs.length).toBe(1);

      expect(wrapper.className).not.toEqual(
        expect.stringContaining('absolute'),
      );
      expect(wrapper.className).not.toEqual(expect.stringContaining('fixed'));
    });

    it('loading with only right icon replaces it with an inline spinner', () => {
      render(
        <Button isLoading rightIcon={Square}>
          Loading
        </Button>,
      );
      const btn = screen.getByTestId('button');
      const svgs = btn.querySelectorAll('svg');
      const wrapper = screen.getByTestId('spinner-wrapper');

      expect(btn.className).not.toEqual(
        expect.stringContaining(
          '*:not-[[data-testid="spinner-wrapper"]]:opacity-0',
        ),
      );
      expect(svgs.length).toBe(1);

      expect(wrapper.className).not.toEqual(
        expect.stringContaining('absolute'),
      );
      expect(wrapper.className).not.toEqual(expect.stringContaining('fixed'));
    });

    it('loading with both icons keeps icons in DOM and adds overlay spinner', () => {
      render(
        <Button isLoading leftIcon={Circle} rightIcon={Square}>
          Loading
        </Button>,
      );
      const btn = screen.getByTestId('button');
      const svgs = btn.querySelectorAll('svg');
      const progress = screen.getByRole('progressbar', { name: 'Loading' });

      expect(btn.className).toEqual(
        expect.stringContaining(
          '*:not-[[data-testid="spinner-wrapper"]]:opacity-0',
        ),
      );
      expect(svgs.length).toBe(3);

      expect(progress).toBeInTheDocument();
    });

    it('loading overrides surface styles based on variant', () => {
      const { rerender } = render(
        <Button isLoading variant="filled">
          Loading
        </Button>,
      );
      let btn = screen.getByTestId('button');

      expect(btn.className).toEqual(
        expect.stringContaining('bg-secondary-light'),
      );

      rerender(
        <Button isLoading variant="outlined">
          Loading
        </Button>,
      );
      btn = screen.getByTestId('button');

      expect(btn.className).toEqual(
        expect.stringContaining('border-foreground-light/38'),
      );
    });
  });

  describe('icons', () => {
    it('renders left and right icons when provided', () => {
      render(
        <Button leftIcon={Circle} rightIcon={Square}>
          With Icons
        </Button>,
      );
      const btn = screen.getByTestId('button');
      const svgs = btn.querySelectorAll('svg');

      expect(svgs.length).toBe(2);
    });

    it('renders only one icon when a single icon is provided', () => {
      render(<Button leftIcon={Circle}>One Icon</Button>);
      const btn = screen.getByTestId('button');
      const svgs = btn.querySelectorAll('svg');

      expect(svgs.length).toBe(1);
    });
  });

  describe('events & prop forwarding', () => {
    it('fires onClick when enabled', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click</Button>);
      const btn = screen.getByTestId('button');

      await userEvent.click(btn);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
    describe('keyboard interactions', () => {
      it('triggers onClick with Enter and Space keys', async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Key Press</Button>);
        const btn = screen.getByTestId('button');

        btn.focus();
        expect(btn).toHaveFocus();

        await userEvent.keyboard('{Enter}');
        await userEvent.keyboard(' ');
        expect(onClick).toHaveBeenCalledTimes(2);
      });
    });

    it('forwards className and data attributes; supports testId/label', () => {
      render(
        <Button
          className="rounded p-2"
          data-analytics="cta"
          testId="cta"
          label="Submit"
        >
          CTA
        </Button>,
      );
      const btn = screen.getByTestId('cta');

      expect(btn).toHaveClass('p-2', 'rounded');
      expect(btn).toHaveAttribute('data-analytics', 'cta');
      expect(btn).toHaveAttribute('aria-label', 'Submit');
      expect(btn).toHaveTextContent('CTA');
    });
  });
});
