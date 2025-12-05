import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from './Select';
import { SelectContent } from './SelectContent';
import { SelectItem } from './SelectItem';
import { SelectTrigger } from './SelectTrigger';

const options = [
  { value: 'apple', content: 'Apple' },
  { value: 'banana', content: 'Banana' },
  { value: 'peach', content: 'Peach' },
];

const getContent = (value: string) =>
  options.find(option => option.value === value)?.content ?? '';

const renderBase = (
  override: Partial<React.ComponentProps<typeof Select>> = {},
) =>
  render(
    <Select
      getContent={value => options.find(o => o.value === value)?.content ?? ''}
      {...override}
    >
      <SelectTrigger placeholder="Fruits" />
      <SelectContent>
        {options.map(o => (
          <SelectItem key={o.value} value={o.value}>
            {o.content}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>,
  );

describe('[Components] Select (current implementation)', () => {
  describe('rendering & structure', () => {
    it('renders trigger (combobox) with aria linkage to listbox and placeholder label', () => {
      renderBase();
      const label = screen.getByTestId('select-trigger-label');
      const trigger = screen.getByTestId('select-trigger');
      const controls = trigger.getAttribute('aria-controls');
      const content = screen.getByTestId('select-content');

      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Fruits');
      expect(trigger).toHaveValue('');

      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('role', 'combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(controls).toBeTruthy();

      expect(content).toBeInTheDocument();
      expect(content.id).toBe(controls);
      expect(content).toHaveAttribute('role', 'listbox');
    });

    it('uses built-in defaultGetContent when getContent prop is omitted', async () => {
      render(
        <Select defaultValue="apple">
          <SelectTrigger placeholder="Fruits" />
          <SelectContent>
            {options.map(({ value, content }) => (
              <SelectItem key={value} value={value}>
                {content}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>,
      );
      const trigger = screen.getByTestId('select-trigger');

      expect(trigger).toHaveValue('apple');

      await userEvent.click(trigger);
      await userEvent.click(screen.getByRole('option', { name: 'Banana' }));

      expect(trigger).toHaveValue('banana');
    });
  });

  describe('open / close interactions', () => {
    it('opens on trigger click and closes after selecting an option', async () => {
      renderBase();
      const trigger = screen.getByTestId('select-trigger');
      const content = screen.getByTestId('select-content');

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(content.className).toContain('opacity-0');

      await userEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      const option = screen.getByText('Banana');
      await userEvent.click(option);

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveValue('Banana');
    });

    it('closes when clicking outside while open', async () => {
      render(
        <>
          <button data-testid="outside">outside</button>
          <Select getContent={getContent}>
            <SelectTrigger placeholder="Fruits" />
            <SelectContent>
              {options.map(({ value, content }) => (
                <SelectItem key={value} value={value}>
                  {content}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>,
      );
      const trigger = screen.getByTestId('select-trigger');
      const outside = screen.getByTestId('outside');

      await userEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(outside);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('uncontrolled value flow', () => {
    it('defaultValue sets initial displayed content via getContent', () => {
      renderBase({ defaultValue: 'banana' });
      const trigger = screen.getByTestId('select-trigger');

      expect(trigger).toHaveValue('Banana');
    });

    it('selecting an option updates displayed value (internal state)', async () => {
      renderBase({ defaultValue: 'apple' });
      const trigger = screen.getByTestId('select-trigger');

      expect(trigger).toHaveValue('Apple');

      await userEvent.click(trigger);
      await userEvent.click(screen.getByText('Peach'));

      expect(trigger).toHaveValue('Peach');
    });
  });

  describe('controlled value flow', () => {
    it('invokes onChange and relies on parent to update value', async () => {
      const onChange = vi.fn();
      const { rerender } = renderBase({ value: 'apple', onChange });
      const trigger = screen.getByTestId('select-trigger');

      expect(trigger).toHaveValue('Apple');

      await userEvent.click(trigger);
      await userEvent.click(screen.getByText('Banana'));

      expect(onChange).toHaveBeenCalledWith('banana');
      expect(trigger).toHaveValue('Apple');

      rerender(
        <Select getContent={getContent} value="banana" onChange={onChange}>
          <SelectTrigger placeholder="Fruits" />
          <SelectContent>
            {options.map(({ value, content }) => (
              <SelectItem key={value} value={value}>
                {content}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>,
      );

      expect(trigger).toHaveValue('Banana');
    });
  });

  describe('context enforcement', () => {
    it('throws if SelectTrigger is rendered outside of Select', () => {
      expect(() => render(<SelectTrigger placeholder="Alone" />)).toThrow(
        'SelectTrigger must be used within a <Select>',
      );
    });
  });

  describe('defensive branches', () => {
    it('early returns without crashing if unmounted before effect commit', () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const removeSpy = vi.spyOn(document, 'removeEventListener');

      const { unmount } = render(
        <Select
          getContent={v => options.find(o => o.value === v)?.content ?? ''}
        >
          <SelectTrigger placeholder="Fruits" />
          <SelectContent>
            {options.map(({ value, content }) => (
              <SelectItem key={value} value={value}>
                {content}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>,
      );

      // Immediately unmount to mimic scenario where effect cleanup path runs.
      unmount();

      // Ensure any click listeners registered were also cleaned (0 or matched add/remove counts)
      const added = addSpy.mock.calls.filter(c => c[0] === 'click').length;
      const removed = removeSpy.mock.calls.filter(c => c[0] === 'click').length;

      expect(removed).toBe(added);

      addSpy.mockRestore();
      removeSpy.mockRestore();
    });
  });

  describe('SelectItem keyboard interactions', () => {
    it('selects an option with Enter key', async () => {
      const onChange = vi.fn();
      renderBase({ onChange });
      const trigger = screen.getByTestId('select-trigger');

      await userEvent.click(trigger);

      const banana = screen.getByRole('option', { name: 'Banana' });
      banana.focus();
      await userEvent.keyboard('{Enter}');

      expect(onChange).toHaveBeenCalledWith('banana');
    });

    it('selects an option with Space key', async () => {
      const onChange = vi.fn();
      renderBase({ onChange });
      const trigger = screen.getByTestId('select-trigger');

      await userEvent.click(trigger);

      const peach = screen.getByRole('option', { name: 'Peach' });
      peach.focus();
      await userEvent.keyboard(' '); // Spacebar

      expect(onChange).toHaveBeenCalledWith('peach');
    });

    it('does not select a disabled option via keyboard', async () => {
      const onChange = vi.fn();
      render(
        <Select getContent={getContent} onChange={onChange}>
          <SelectTrigger placeholder="Fruits" />
          <SelectContent>
            {[
              ...options.map(o => (
                <SelectItem key={o.value} value={o.value}>
                  {o.content}
                </SelectItem>
              )),
              <SelectItem key="disabled-item" value="disabled-item" isDisabled>
                Disabled Option
              </SelectItem>,
            ]}
          </SelectContent>
        </Select>,
      );
      const trigger = screen.getByTestId('select-trigger');

      await userEvent.click(trigger);

      const disabled = screen.getByRole('option', { name: 'Disabled Option' });
      disabled.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
