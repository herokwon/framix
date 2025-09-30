import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';

describe('[Components] Checkbox', () => {
  describe('rendering', () => {
    it('renders input type=checkbox with defaults', () => {
      render(<Checkbox />);

      const wrapper = screen.getByTestId('checkbox-wrapper');
      const input = screen.getByTestId('checkbox') as HTMLInputElement;
      const svg = wrapper.querySelector('svg');

      expect(wrapper).toBeInTheDocument();

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'checkbox');
      expect(input).not.toBeDisabled();
      expect(input.checked).toBe(false);

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders label text when provided', () => {
      render(<Checkbox label="Accept terms" />);
      const wrapper = screen.getByTestId('checkbox-wrapper');

      expect(wrapper).toHaveTextContent('Accept terms');
    });
  });

  describe('controlled vs uncontrolled', () => {
    it('controlled: respects isChecked and does not toggle without prop change', async () => {
      const onChange = vi.fn();
      render(<Checkbox isChecked label="c" onChange={onChange} />);
      const input = screen.getByTestId('checkbox') as HTMLInputElement;

      expect(input.checked).toBe(true);

      await userEvent.click(input);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(input.checked).toBe(true);
    });

    it('uncontrolled: uses defaultChecked and toggles on click', async () => {
      const onChange = vi.fn();
      render(<Checkbox defaultChecked label="u" onChange={onChange} />);
      const input = screen.getByTestId('checkbox') as HTMLInputElement;

      expect(input.checked).toBe(true);

      await userEvent.click(input);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(input.checked).toBe(false);
    });
  });

  describe('states', () => {
    it('disabled: prevents interaction', async () => {
      const onChange = vi.fn();
      render(<Checkbox isDisabled onChange={onChange} />);
      const wrapper = screen.getByTestId('checkbox-wrapper');
      const input = screen.getByTestId('checkbox');

      expect(wrapper).toHaveClass('disabled');

      expect(input).toBeDisabled();

      await userEvent.click(wrapper);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('indeterminate: renders minus path; transition class persists; visibility toggles by value', () => {
      const { rerender } = render(<Checkbox isIndeterminate />);
      const wrapper = screen.getByTestId('checkbox-wrapper');
      const svg = wrapper.querySelector('svg')!;
      const minus = wrapper.querySelector('path:last-child');

      expect(svg).toHaveClass('*:not-first:transition-opacity');

      expect(minus).toBeInTheDocument();
      expect(minus).not.toHaveClass('opacity-0');

      rerender(<Checkbox isIndeterminate={false} />);

      expect(minus).toHaveClass('opacity-0');
    });
  });

  describe('interactions', () => {
    it('label click toggles checkbox in uncontrolled mode', async () => {
      render(<Checkbox defaultChecked={false} label="Toggle" />);
      const wrapper = screen.getByTestId('checkbox-wrapper');
      const input = screen.getByTestId('checkbox') as HTMLInputElement;

      expect(input.checked).toBe(false);

      await userEvent.click(wrapper);
      expect(input.checked).toBe(true);
    });
  });

  describe('prop forwarding', () => {
    it('merges className into input and forwards data attributes', () => {
      render(
        <Checkbox className="border p-1" data-analytics="cb" testId="cb" />,
      );
      const input = screen.getByTestId('cb');

      expect(input).toHaveClass('border', 'p-1');
      expect(input).toHaveAttribute('data-analytics', 'cb');
    });
  });
});
