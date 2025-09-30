import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Circle, Square } from 'lucide-react';

import { ICON_SIZES } from '@data';

import { Button } from './Button';

describe('[Components] Button', () => {
  describe('rendering', () => {
    it('renders with default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      const text = screen.getByTestId('text');

      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-label', 'Button');
      expect(button).not.toBeDisabled();

      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveTextContent('Click me');
    });

    it('renders with explicit type prop', () => {
      render(<Button type="submit">Send</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders with custom testId and label', () => {
      render(
        <Button testId="btn" label="Go">
          Go
        </Button>,
      );
      const button = screen.getByRole('button');

      expect(button).toBe(screen.getByTestId('btn'));
      expect(button).toBe(screen.getByLabelText('Go'));
    });
  });

  describe('variant & color', () => {
    it('applies filled + primary styles', () => {
      render(
        <Button variant="filled" color="primary">
          Filled Primary
        </Button>,
      );
      const button = screen.getByRole('button');
      const text = screen.getByText('Filled Primary');

      expect(button).toHaveClass('bg-primary-light dark:bg-primary-dark');

      expect(text).toHaveClass('font-semibold');
      expect(text).toHaveClass('text-foreground-dark');
    });

    it('applies outlined + default styles', () => {
      render(
        <Button variant="outlined" color="default">
          Outlined Default
        </Button>,
      );
      const button = screen.getByRole('button');
      const text = screen.getByText('Outlined Default');

      expect(button).toHaveClass(
        'border border-foreground-light/38 dark:border-foreground-dark/38',
      );

      expect(text).toHaveClass('font-medium');
      expect(text).toHaveClass(
        'text-foreground-light dark:text-foreground-dark',
      );
    });

    it('applies text + success styles', () => {
      render(
        <Button variant="standard" color="success">
          Text Success
        </Button>,
      );
      const button = screen.getByRole('button');
      const text = screen.getByText('Text Success');

      expect(button).toHaveClass(
        'hover:not-disabled:bg-success-background-light dark:hover:not-disabled:bg-success-background-dark',
      );

      expect(text).toHaveClass('font-medium');
      expect(text).toHaveClass('text-success-light dark:text-success-dark');
    });

    it('applies filled + warning special text color and bg tokens', () => {
      render(
        <Button variant="filled" color="warning">
          Warn
        </Button>,
      );
      const button = screen.getByRole('button');
      const text = screen.getByText('Warn');

      expect(button).toHaveClass('bg-warning-light dark:bg-warning-dark');

      expect(text).toHaveClass('font-semibold');
      expect(text).toHaveClass('text-foreground-light');
    });
  });

  describe('size', () => {
    it('applies sm sizing and icon size', () => {
      render(
        <Button size="sm" leftIcon={Circle}>
          Small
        </Button>,
      );
      const button = screen.getByRole('button');
      const text = screen.getByText('Small');
      const icon = screen.getByRole('img', { hidden: true });

      expect(button).toHaveClass('h-6 gap-x-1.5 px-3');

      expect(text).toHaveClass('text-body3');

      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('width', ICON_SIZES.sm.toString());
      expect(icon).toHaveAttribute('height', ICON_SIZES.sm.toString());
    });

    it('applies lg sizing paddings', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      const text = screen.getByText('Large');

      expect(button).toHaveClass('h-10 gap-x-2.5 px-5');
      expect(text).toHaveClass('text-body1');
    });

    it('applies full width when isFullWidth is true', () => {
      render(<Button isFullWidth>Wide</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('w-full');
    });
  });

  describe('shape', () => {
    it('applies circle shape', () => {
      render(
        <Button shape="circle" leftIcon={Circle} rightIcon={Square}>
          Circle
        </Button>,
      );
      const button = screen.getByRole('button');

      expect(button).toHaveClass('rounded-full');
      expect(button).not.toHaveClass('rounded');
    });

    it('applies square shape', () => {
      render(
        <Button shape="square" leftIcon={Circle} rightIcon={Square}>
          Square
        </Button>,
      );
      const button = screen.getByRole('button');

      expect(button).toHaveClass('rounded');
      expect(button).not.toHaveClass('rounded-full');
    });
  });

  describe('status', () => {
    it('disabled blocks clicks', async () => {
      const onClick = vi.fn();
      render(
        <Button isDisabled onClick={onClick}>
          Disabled
        </Button>,
      );
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled');

      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('selected adds active class token', () => {
      render(<Button isSelected>Selected</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('active');
    });

    it('loading without icons shows overlay spinner and hides others', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      const spinnerWrapper = screen.getByTestId('spinner-wrapper');
      const progress = screen.getByRole('progressbar', { name: 'Loading' });

      expect(button).toHaveClass(
        'pointer-events-none opacity-text-disabled *:not-[[data-testid="spinner-wrapper"]]:opacity-0',
      );

      expect(spinnerWrapper).toBeInTheDocument();
      expect(progress).toBeInTheDocument();
    });

    it('loading with one icon replaces icon with inline spinner', () => {
      render(
        <Button isLoading leftIcon={Circle}>
          Loading
        </Button>,
      );
      const button = screen.getByRole('button');
      const svgs = button.querySelectorAll('svg');
      const spinnerWrapper = screen.getByTestId('spinner-wrapper');

      expect(button).not.toHaveClass(
        '*:not-[[data-testid="spinner-wrapper"]]:opacity-0',
      );

      expect(svgs.length).toBe(1);

      expect(spinnerWrapper).not.toHaveClass('absolute');
      expect(spinnerWrapper).not.toHaveClass('fixed');
    });

    it('loading with only right icon replaces it with an inline spinner', () => {
      render(
        <Button isLoading rightIcon={Square}>
          Loading
        </Button>,
      );
      const button = screen.getByRole('button');
      const svgs = button.querySelectorAll('svg');
      const spinnerWrapper = screen.getByTestId('spinner-wrapper');

      expect(button).not.toHaveClass(
        '*:not-[[data-testid="spinner-wrapper"]]:opacity-0',
      );

      expect(svgs.length).toBe(1);

      expect(spinnerWrapper).not.toHaveClass('absolute');
      expect(spinnerWrapper).not.toHaveClass('fixed');
    });

    it('loading with both icons keeps icons in DOM and adds overlay spinner', () => {
      render(
        <Button isLoading leftIcon={Circle} rightIcon={Square}>
          Loading
        </Button>,
      );
      const button = screen.getByRole('button');
      const svgs = button.querySelectorAll('svg');
      const progress = screen.getByRole('progressbar', { name: 'Loading' });

      expect(button).toHaveClass(
        '*:not-[[data-testid="spinner-wrapper"]]:opacity-0',
      );

      expect(svgs.length).toBe(3);

      expect(progress).toBeInTheDocument();
      expect(progress).toHaveClass('animate-spin');
    });

    it('loading overrides surface styles based on variant', () => {
      const { rerender } = render(
        <Button isLoading variant="filled">
          Loading
        </Button>,
      );
      let button = screen.getByRole('button');

      expect(button).toHaveClass('bg-secondary-light');

      rerender(
        <Button isLoading variant="outlined">
          Loading
        </Button>,
      );
      button = screen.getByRole('button');

      expect(button).toHaveClass('border-foreground-light/38');
    });
  });

  describe('icons', () => {
    it('renders left and right icons when provided', () => {
      render(
        <Button leftIcon={Circle} rightIcon={Square}>
          With Icons
        </Button>,
      );
      const icons = screen.getAllByRole('img', { hidden: true });

      expect(icons.length).toBe(2);
    });

    it('renders only one icon when a single icon is provided', () => {
      render(<Button leftIcon={Circle}>One Icon</Button>);
      const icons = screen.getAllByRole('img', { hidden: true });

      expect(icons.length).toBe(1);
    });
  });

  describe('events & prop forwarding', () => {
    it('fires onClick when enabled', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click</Button>);
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not fire onClick when disabled', async () => {
      const onClick = vi.fn();
      render(
        <Button isDisabled onClick={onClick}>
          Disabled
        </Button>,
      );
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not fire onClick when loading', async () => {
      const onClick = vi.fn();
      render(
        <Button isLoading onClick={onClick}>
          Loading
        </Button>,
      );
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    describe('keyboard interactions', () => {
      it('triggers onClick with Enter and Space keys', async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Key Press</Button>);
        const button = screen.getByRole('button');

        button.focus();
        expect(button).toHaveFocus();

        await userEvent.keyboard('{Enter}');
        await userEvent.keyboard(' ');

        expect(onClick).toHaveBeenCalledTimes(2);
      });
    });

    it('forwards className and data attributes', () => {
      render(
        <Button className="rounded p-2" testId="cta" data-analytics="cta">
          CTA
        </Button>,
      );
      const button = screen.getByTestId('cta');

      expect(button).toHaveClass('p-2', 'rounded');
      expect(button).toHaveAttribute('data-analytics', 'cta');
      expect(button).toHaveTextContent('CTA');
    });
  });
});
