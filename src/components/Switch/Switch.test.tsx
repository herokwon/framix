import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from './Switch';

const getSwitchElement = (testId: string = 'switch') =>
  screen.getByTestId(testId);

describe('[Form] Switch', () => {
  describe('rendering & structure', () => {
    it('renders as button role=switch with default unchecked state', () => {
      render(<Switch />);
      const switchElement = getSwitchElement();

      expect(switchElement).toBeInTheDocument();
      expect(switchElement.tagName).toBe('button'.toUpperCase());
      expect(switchElement).toHaveAttribute('role', 'switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
      expect(switchElement).not.toBeDisabled();
    });

    it('applies provided label as aria-label', () => {
      render(<Switch label="Dark Mode" />);
      const switchElement = getSwitchElement();

      expect(switchElement).toHaveAttribute('aria-label', 'Dark Mode');
    });
  });

  describe('uncontrolled vs controlled', () => {
    it('uncontrolled: uses defaultChecked and toggles internal state', async () => {
      const onChange = vi.fn();
      render(<Switch defaultChecked label="u" onChange={onChange} />);
      const switchElement = getSwitchElement();

      expect(switchElement).toHaveAttribute('aria-checked', 'true');

      await userEvent.click(switchElement);

      expect(onChange).toHaveBeenCalledWith(false);
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('controlled: does not change aria-checked until parent updates', async () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <Switch isChecked={false} label="c" onChange={onChange} />,
      );
      const switchElement = getSwitchElement();

      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await userEvent.click(switchElement);

      expect(onChange).toHaveBeenCalledWith(true);
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch isChecked={true} label="c" onChange={onChange} />);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('states', () => {
    it('disabled: prevents toggling and onChange', async () => {
      const onChange = vi.fn();
      render(<Switch isDisabled defaultChecked onChange={onChange} />);
      const switchElement = getSwitchElement();

      expect(switchElement).toBeDisabled();
      expect(switchElement).toHaveAttribute('aria-checked', 'true');

      await userEvent.click(switchElement);

      expect(onChange).not.toHaveBeenCalled();
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('hasShadow=false removes inner shadow classes', () => {
      render(<Switch hasShadow={false} />);
      const switchElement = getSwitchElement();

      expect(switchElement.className).not.toMatch(/shadow-inner/);
    });
  });

  describe('interaction', () => {
    it('click toggles (uncontrolled)', async () => {
      render(<Switch defaultChecked={false} />);
      const switchElement = getSwitchElement();

      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await userEvent.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('knob applies translation class when checked', () => {
      render(<Switch defaultChecked />);
      const switchElement = getSwitchElement();
      const knob = switchElement.querySelector('svg');

      expect(knob).toHaveClass(/translate-x/);
    });
  });

  describe('prop forwarding', () => {
    it('merges className and data attributes', () => {
      render(<Switch className="outline" data-test="sw" testId="sw" />);
      const switchElement = getSwitchElement('sw');

      expect(switchElement.className).toMatch(/outline/);
      expect(switchElement).toHaveAttribute('data-test', 'sw');
    });
  });
});
