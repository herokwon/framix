import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextField } from './TextField';

describe('[Form] TextField', () => {
  const base = (override?: Partial<Parameters<typeof TextField>[0]>) => (
    <TextField label="Label" id="tf-id" name="tf" {...override} />
  );

  describe('rendering', () => {
    it('renders outlined variant with default props', () => {
      render(base());
      const wrapper = screen.getByTestId('text-field-wrapper');
      const input = screen.getByRole('textbox');
      const label = screen.getByTestId('text-field-label');

      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('rounded border');

      expect(input).toBeInTheDocument();
      expect(input).not.toBeRequired();
      expect(input).not.toBeDisabled();
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('placeholder', ' ');
      expect(input).toHaveAttribute('aria-disabled', 'false');
      expect(input).toHaveAttribute('aria-invalid', 'false');

      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('for', 'tf-id');
    });

    it('does not render label when label prop is empty', () => {
      render(<TextField id="nolab" name="nolab" label="" />);
      expect(screen.queryByTestId('text-field-label')).toBeNull();
    });
  });

  describe('variants', () => {
    it('filled variant applies background tokens', () => {
      render(base({ variant: 'filled', label: 'Filled' }));
      const wrapper = screen.getByTestId('text-field-wrapper');

      expect(wrapper).toHaveClass('bg-secondary-light dark:bg-secondary-dark');
    });

    it('text variant uses border-y and transparent top border', () => {
      render(base({ variant: 'text', label: 'Text' }));
      const wrapper = screen.getByTestId('text-field-wrapper');

      expect(wrapper).toHaveClass('border-y border-t-transparent!');
    });
  });

  describe('states', () => {
    it('disabled state sets disabled attributes and label pointer-events-none', () => {
      render(base({ isDisabled: true }));
      const wrapper = screen.getByTestId('text-field-wrapper');
      const input = screen.getByRole('textbox');
      const label = screen.getByTestId('text-field-label');

      expect(wrapper).not.toHaveClass('disabled');

      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('aria-disabled', 'true');

      expect(label).toHaveClass('group-has-disabled:pointer-events-none');
    });

    it('error state sets aria-invalid and danger classes', () => {
      render(base({ hasError: true }));
      const input = screen.getByRole('textbox');
      const label = screen.getByTestId('text-field-label');
      const wrapper = screen.getByTestId('text-field-wrapper');

      expect(wrapper).toHaveClass(
        'border-danger-light dark:border-danger-dark',
      );
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(label).toHaveClass('text-danger-light dark:text-danger-dark');
    });
  });

  describe('required & description', () => {
    it('shows asterisk for required field and description text', () => {
      render(
        <TextField
          id="req"
          name="req"
          label="Required"
          isRequired
          description="This field is required."
        />,
      );
      const input = screen.getByRole('textbox');
      const label = screen.getByTestId('text-field-label');
      const desc = screen.getByText('This field is required.');

      expect(input).toBeRequired();
      expect(label).toHaveTextContent('Required*');
      expect(desc).toBeInTheDocument();
    });
  });

  describe('typing interaction', () => {
    it('accepts user input (uncontrolled) and retains value', async () => {
      render(<TextField id="t1" name="t1" label="Type" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      await userEvent.type(input, 'hello');
      expect(input.value).toBe('hello');
    });

    it('respects provided type attribute', async () => {
      render(<TextField id="em" name="em" label="Email" type="email" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('accessories', () => {
    it('renders rightInput when provided', () => {
      render(base({ rightInput: <span data-testid="ri">RI</span> }));
      const ri = screen.getByTestId('ri');

      expect(ri).toBeInTheDocument();
    });
  });

  describe('prop forwarding', () => {
    it('forwards className and data attributes to input', () => {
      render(
        <TextField
          id="fw"
          name="fw"
          label="FW"
          className="rounded-xl shadow-inner"
          data-analytics="tf"
          testId="tf"
        />,
      );
      const input = screen.getByTestId('tf');

      expect(input).toHaveClass('rounded-xl', 'shadow-inner');
      expect(input).toHaveAttribute('data-analytics', 'tf');
    });
  });
});
