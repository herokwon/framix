import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';
import Tooltip from './Tooltip';

describe('[UI] Tooltip', () => {
  it('links trigger and tooltip via aria-describedby', () => {
    render(
      <Tooltip content="Helpful info">
        <Button>Trigger</Button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    const tooltip = screen.getByRole('tooltip');
    const id = tooltip.id;

    expect(id).toMatch(/^tooltip-/);
    expect(trigger).toHaveAttribute('aria-describedby', id!);
    expect(tooltip).toHaveTextContent('Helpful info');
  });

  it('preserves existing aria-describedby and appends new one', () => {
    render(
      <Tooltip content="Extra data">
        <Button aria-describedby="base">Trigger</Button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    const tooltip = screen.getByRole('tooltip');
    const id = tooltip.id;

    expect(id).toMatch(/^tooltip-/);
    expect(trigger.getAttribute('aria-describedby')).toBe(`base ${id}`);
  });

  it('does not render tooltip or aria-describedby when disabled', () => {
    render(
      <Tooltip content="Hidden" isDisabled>
        <Button>Trigger</Button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');

    expect(trigger).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('applies vertical-first position class tokens (top-left)', () => {
    render(
      <Tooltip position="top-left" content="Tip">
        <Button>A</Button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole('tooltip');
    const container = tooltip.parentElement!;

    expect(container).toHaveClass('bottom-full left-0 py-1');
  });

  it('applies horizontal-first position class tokens (left-top)', () => {
    render(
      <Tooltip position="left-top" content="Tip">
        <Button>B</Button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole('tooltip');
    const container = tooltip.parentElement!;

    expect(container).toHaveClass('top-0 right-full px-1');
  });

  it('applies middle alignment translation (right-middle)', () => {
    render(
      <Tooltip position="right-middle" content="Tip">
        <Button>C</Button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole('tooltip');
    const container = tooltip.parentElement!;

    expect(container).toHaveClass('top-1/2 left-full -translate-y-1/2');
  });

  it('centers horizontally for bottom-center', () => {
    render(
      <Tooltip position="bottom-center" content="Tip">
        <Button>D</Button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole('tooltip');
    const container = tooltip.parentElement!;

    expect(container).toHaveClass('top-full left-1/2 -translate-x-1/2');
  });

  it('forwards wrapper className and data-* attributes', () => {
    render(
      <Tooltip className="wrapper-test" data-track="t" content="Meta">
        <Button>Trigger</Button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole('tooltip');
    const wrapper = tooltip.parentElement!.parentElement!;

    expect(wrapper).toHaveClass('wrapper-test');
    expect(wrapper).toHaveAttribute('data-track', 't');
  });

  it('keeps tooltip node hidden (opacity-0) before hover but present in DOM', async () => {
    render(
      <Tooltip content="Hidden until hover">
        <Button>Trigger</Button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole('tooltip');
    const container = tooltip.parentElement!;

    expect(container).toHaveClass('opacity-0');

    await userEvent.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBe(tooltip);
  });
});
