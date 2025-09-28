import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Radio from './Radio';
import RadioGroup from './RadioGroup';

describe('[Form] RadioGroup (comprehensive)', () => {
  describe('rendering and name propagation', () => {
    it('renders children and propagates name', () => {
      render(
        <RadioGroup name="color">
          <Radio value="red" label="Red" />
          <Radio value="blue" label="Blue" />
        </RadioGroup>,
      );
      const inputs = screen.getAllByRole('radio');

      expect(inputs).toHaveLength(2);
      expect(inputs[0]).toHaveAttribute('name', 'color');
      expect(inputs[1]).toHaveAttribute('name', 'color');
    });
  });

  describe('uncontrolled interactions', () => {
    it('defaultValue selects initially and toggles on wrapper click', async () => {
      render(
        <RadioGroup name="color" defaultValue="red">
          <Radio value="red" label="Red" />
          <Radio value="blue" label="Blue" />
        </RadioGroup>,
      );
      const wrappers = screen.getAllByTestId('radio-wrapper');
      const inputs = screen.getAllByRole('radio') as HTMLInputElement[];

      expect(inputs[0].checked).toBe(true);
      expect(inputs[1].checked).toBe(false);

      await userEvent.click(wrappers[1]);

      expect(inputs[0].checked).toBe(false);
      expect(inputs[1].checked).toBe(true);
    });

    it('Space selects the focused radio', async () => {
      render(
        <RadioGroup name="color">
          <Radio value="red" label="Red" />
          <Radio value="blue" label="Blue" />
        </RadioGroup>,
      );
      const inputs = screen.getAllByRole('radio') as HTMLInputElement[];

      inputs[1].focus();
      await userEvent.keyboard('[Space]');

      expect(inputs[0].checked).toBe(false);
      expect(inputs[1].checked).toBe(true);
    });
  });

  describe('controlled flow', () => {
    it('fires onChange and relies on parent to update value', async () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <RadioGroup name="color" value="red" onChange={onChange}>
          <Radio value="red" label="Red" />
          <Radio value="blue" label="Blue" />
        </RadioGroup>,
      );
      const wrappers = screen.getAllByTestId('radio-wrapper');
      const inputs = screen.getAllByRole('radio') as HTMLInputElement[];

      expect(inputs[0].checked).toBe(true);
      expect(inputs[1].checked).toBe(false);

      await userEvent.click(wrappers[1]);

      expect(onChange).toHaveBeenCalledWith('blue');
      expect(inputs[0].checked).toBe(true);
      expect(inputs[1].checked).toBe(false);

      rerender(
        <RadioGroup name="color" value="blue" onChange={onChange}>
          <Radio value="red" label="Red" />
          <Radio value="blue" label="Blue" />
        </RadioGroup>,
      );

      expect(inputs[0].checked).toBe(false);
      expect(inputs[1].checked).toBe(true);
    });
  });

  describe('form submission', () => {
    it('submits only selected value', async () => {
      let submitted: Record<string, FormDataEntryValue> | null = null;
      const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitted = Object.fromEntries(new FormData(e.currentTarget).entries());
      });

      render(
        <form onSubmit={handleSubmit}>
          <RadioGroup name="color" defaultValue="blue">
            <Radio value="red" label="Red" />
            <Radio value="blue" label="Blue" />
          </RadioGroup>
          <button type="submit">submit</button>
        </form>,
      );

      await userEvent.click(screen.getByText('submit'));
      expect(submitted).toEqual({ color: 'blue' });
    });
  });

  describe('disabled states', () => {
    it('group disabled disables all children and blocks change', async () => {
      const onChange = vi.fn();
      render(
        <RadioGroup name="color" isDisabled onChange={onChange}>
          <Radio value="red" label="Red" />
          <Radio value="blue" label="Blue" />
          <Radio value="yellow" label="Yellow" />
        </RadioGroup>,
      );
      const wrappers = screen.getAllByTestId('radio-wrapper');
      const inputs = screen.getAllByRole('radio');

      wrappers.forEach(wrapper => expect(wrapper).toHaveClass('disabled'));
      inputs.forEach(i => expect(i).toBeDisabled());

      await userEvent.click(wrappers[2]);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('partial disabled child remains inactive while others toggle', async () => {
      render(
        <RadioGroup name="color">
          <Radio value="red" label="Red" />
          <Radio value="blue" label="Blue" />
          <Radio value="green" label="Green" isDisabled />
        </RadioGroup>,
      );
      const wrappers = screen.getAllByTestId('radio-wrapper');
      const inputs = screen.getAllByRole('radio') as HTMLInputElement[];

      expect(inputs[2]).toBeDisabled();

      await userEvent.click(wrappers[2]);
      expect(inputs[2].checked).toBe(false);

      await userEvent.click(wrappers[0]);
      expect(inputs[0].checked).toBe(true);
    });
  });

  describe('context enforcement', () => {
    it('throws when Radio is used outside of RadioGroup', () => {
      expect(() => render(<Radio value="solo" label="Solo" />)).toThrow(
        'Radio must be used within a RadioGroup',
      );
    });
  });
});
