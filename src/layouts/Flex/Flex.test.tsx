import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Flex } from './Flex';

describe('[Layouts] Flex', () => {
  describe('rendering', () => {
    it('renders as div by default', () => {
      render(<Flex testId="flex">Content</Flex>);
      const flex = screen.getByTestId('flex');

      expect(flex.tagName).toBe('DIV');
      expect(flex).toHaveClass('flex');
      expect(flex).toHaveTextContent('Content');
    });

    it('renders with custom className', () => {
      render(
        <Flex testId="flex" className="rounded-md border p-4">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('p-4', 'rounded-md', 'border', 'flex');
      expect(flex).toHaveTextContent('Content');
    });

    it('renders children correctly', () => {
      render(
        <Flex testId="flex">
          <span>Child 1</span>
          <span>Child 2</span>
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveTextContent('Child 1');
      expect(flex).toHaveTextContent('Child 2');
    });

    it('applies default prop values', () => {
      render(<Flex testId="flex">Content</Flex>);
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass(
        'flex',
        'flex-row',
        'justify-start',
        'items-stretch',
        'flex-nowrap',
      );
      expect(flex).not.toHaveClass('inline-flex');
      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 0)',
        rowGap: 'calc(var(--spacing) * 0)',
      });
    });
  });

  describe('polymorphic behavior', () => {
    it('renders as button when as="button"', () => {
      render(
        <Flex as="button" testId="flex">
          Click me
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex.tagName).toBe('BUTTON');
      expect(flex).toHaveClass('flex');
      expect(flex).toHaveTextContent('Click me');
    });

    it('renders as main when as="main"', () => {
      render(
        <Flex as="main" testId="flex">
          Main content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex.tagName).toBe('MAIN');
      expect(flex).toHaveClass('flex');
      expect(flex).toHaveTextContent('Main content');
    });

    it('renders as section when as="section"', () => {
      render(
        <Flex as="section" testId="flex">
          Section content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex.tagName).toBe('SECTION');
      expect(flex).toHaveClass('flex');
      expect(flex).toHaveTextContent('Section content');
    });

    it('renders as header when as="header"', () => {
      render(
        <Flex as="header" testId="flex">
          Header content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex.tagName).toBe('HEADER');
      expect(flex).toHaveClass('flex');
      expect(flex).toHaveTextContent('Header content');
    });

    it('renders as footer when as="footer"', () => {
      render(
        <Flex as="footer" testId="flex">
          Footer content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex.tagName).toBe('FOOTER');
      expect(flex).toHaveClass('flex');
      expect(flex).toHaveTextContent('Footer content');
    });
  });

  describe('direction prop', () => {
    it('applies flex-row class for row direction', () => {
      render(
        <Flex direction="row" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex-row');
      expect(flex).not.toHaveClass('flex-col');
    });

    it('applies flex-row-reverse class for row-reverse direction', () => {
      render(
        <Flex direction="row-reverse" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex-row-reverse');
      expect(flex).not.toHaveClass('flex-row');
    });

    it('applies flex-col class for column direction', () => {
      render(
        <Flex direction="column" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex-col');
      expect(flex).not.toHaveClass('flex-row');
    });

    it('applies flex-col-reverse class for column-reverse direction', () => {
      render(
        <Flex direction="column-reverse" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex-col-reverse');
      expect(flex).not.toHaveClass('flex-col');
    });
  });

  describe('justifyContent prop', () => {
    it('applies justify-start class for start justification', () => {
      render(
        <Flex justifyContent="start" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('justify-start');
    });

    it('applies justify-center class for center justification', () => {
      render(
        <Flex justifyContent="center" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('justify-center');
    });

    it('applies justify-end class for end justification', () => {
      render(
        <Flex justifyContent="end" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('justify-end');
    });

    it('applies justify-around class for space-around justification', () => {
      render(
        <Flex justifyContent="space-around" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('justify-around');
    });

    it('applies justify-between class for space-between justification', () => {
      render(
        <Flex justifyContent="space-between" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('justify-between');
    });

    it('applies justify-evenly class for space-evenly justification', () => {
      render(
        <Flex justifyContent="space-evenly" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('justify-evenly');
    });
  });

  describe('alignItems prop', () => {
    it('applies items-start class for start alignment', () => {
      render(
        <Flex alignItems="start" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('items-start');
    });

    it('applies items-center class for center alignment', () => {
      render(
        <Flex alignItems="center" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('items-center');
    });

    it('applies items-end class for end alignment', () => {
      render(
        <Flex alignItems="end" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('items-end');
    });

    it('applies items-stretch class for stretch alignment', () => {
      render(
        <Flex alignItems="stretch" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('items-stretch');
    });

    it('applies items-baseline class for baseline alignment', () => {
      render(
        <Flex alignItems="baseline" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('items-baseline');
    });
  });

  describe('wrap prop', () => {
    it('applies flex-nowrap class for nowrap', () => {
      render(
        <Flex wrap="nowrap" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex-nowrap');
    });

    it('applies flex-wrap class for wrap', () => {
      render(
        <Flex wrap="wrap" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex-wrap');
    });

    it('applies flex-wrap-reverse class for wrap-reverse', () => {
      render(
        <Flex wrap="wrap-reverse" testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex-wrap-reverse');
    });
  });

  describe('inline prop', () => {
    it('applies flex class by default when inline is false', () => {
      render(
        <Flex inline={false} testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex');
      expect(flex).not.toHaveClass('inline-flex');
    });

    it('applies inline-flex class when inline is true', () => {
      render(
        <Flex inline={true} testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('inline-flex');
      expect(flex).not.toHaveClass('flex');
    });

    it('applies flex class by default when inline prop is not provided', () => {
      render(<Flex testId="flex">Content</Flex>);
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex');
      expect(flex).not.toHaveClass('inline-flex');
    });

    it('combines inline-flex with other flex properties', () => {
      render(
        <Flex
          inline={true}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          testId="flex"
        >
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass(
        'inline-flex',
        'flex-col',
        'justify-center',
        'items-stretch',
      );
      expect(flex).not.toHaveClass('flex');
    });

    it('works correctly with wrap and gap properties', () => {
      render(
        <Flex
          inline={true}
          wrap="wrap"
          gap={{ row: 1, column: 2 }}
          testId="flex"
        >
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('inline-flex', 'flex-wrap');
      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 2)',
        rowGap: 'calc(var(--spacing) * 1)',
      });
    });
  });

  describe('gap prop', () => {
    it('applies default gap values when gap is not provided', () => {
      render(<Flex testId="flex">Content</Flex>);
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 0)',
        rowGap: 'calc(var(--spacing) * 0)',
      });
    });

    it('applies custom column gap', () => {
      render(
        <Flex gap={{ column: 2 }} testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 2)',
        rowGap: 'calc(var(--spacing) * 0)',
      });
    });

    it('applies custom row gap', () => {
      render(
        <Flex gap={{ row: 3 }} testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 0)',
        rowGap: 'calc(var(--spacing) * 3)',
      });
    });

    it('applies both row and column gaps', () => {
      render(
        <Flex gap={{ row: 2, column: 1 }} testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 1)',
        rowGap: 'calc(var(--spacing) * 2)',
      });
    });

    it('handles partial gap object', () => {
      render(
        <Flex gap={{ column: 4 }} testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 4)',
        rowGap: 'calc(var(--spacing) * 0)',
      });
    });
  });

  describe('combined props', () => {
    it('applies multiple flex properties correctly', () => {
      render(
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          wrap="wrap"
          gap={{ row: 1, column: 2 }}
          testId="flex"
        >
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass(
        'flex',
        'flex-col',
        'justify-center',
        'items-stretch',
        'flex-wrap',
      );
      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 2)',
        rowGap: 'calc(var(--spacing) * 1)',
      });
    });

    it('applies all properties with different combinations', () => {
      render(
        <Flex
          direction="row-reverse"
          justifyContent="space-between"
          alignItems="baseline"
          wrap="nowrap"
          gap={{ row: 3, column: 3 }}
          testId="flex"
        >
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass(
        'flex',
        'flex-row-reverse',
        'justify-between',
        'items-baseline',
        'flex-nowrap',
      );
      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 3)',
        rowGap: 'calc(var(--spacing) * 3)',
      });
    });
  });

  describe('event handling', () => {
    it('handles click events when rendered as button', async () => {
      const handleClick = vi.fn();
      render(
        <Flex as="button" onClick={handleClick} testId="flex">
          Click me
        </Flex>,
      );
      const button = screen.getByTestId('flex');

      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveClass('flex');
      expect(button).toHaveTextContent('Click me');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse events', async () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      render(
        <Flex
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          testId="flex"
        >
          Hover me
        </Flex>,
      );
      const flex = screen.getByTestId('flex');
      expect(flex).toHaveTextContent('Hover me');

      await userEvent.hover(flex);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      await userEvent.unhover(flex);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events on focusable elements', async () => {
      const handleKeyDown = vi.fn();
      render(
        <Flex as="div" tabIndex={0} onKeyDown={handleKeyDown} testId="flex">
          Press me
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveAttribute('tabIndex', '0');
      expect(flex).toHaveTextContent('Press me');

      flex.focus();

      await userEvent.keyboard('{Enter}');
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('supports aria attributes', () => {
      render(
        <Flex
          aria-describedby="description"
          testId="flex"
          label="Custom flex container"
        >
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveAttribute('aria-label', 'Custom flex container');
      expect(flex).toHaveAttribute('aria-describedby', 'description');
      expect(flex).toHaveTextContent('Content');
    });

    it('supports role attribute', () => {
      render(
        <Flex role="navigation" testId="flex">
          Navigation content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveAttribute('role', 'navigation');
      expect(flex).toHaveTextContent('Navigation content');
    });

    it('supports semantic HTML elements for accessibility', () => {
      render(
        <Flex as="nav" testId="flex">
          <Flex as="ul" testId="list">
            <li>Item 1</li>
            <li>Item 2</li>
          </Flex>
        </Flex>,
      );

      const nav = screen.getByTestId('flex');
      const list = screen.getByTestId('list');

      expect(nav.tagName).toBe('NAV');
      expect(list.tagName).toBe('UL');
      expect(nav).toHaveClass('flex');
      expect(list).toHaveClass('flex');
    });
  });

  describe('complex content', () => {
    it('renders nested Flex components correctly', () => {
      render(
        <Flex as="main" direction="column" testId="parent">
          <Flex as="header" justifyContent="center" testId="header">
            Header
          </Flex>
          <Flex
            as="div"
            direction="row"
            justifyContent="space-between"
            testId="content"
          >
            <Flex as="aside" direction="column" testId="sidebar">
              Sidebar
            </Flex>
            <Flex as="article" testId="article">
              Article content
            </Flex>
          </Flex>
          <Flex as="footer" justifyContent="center" testId="footer">
            Footer
          </Flex>
        </Flex>,
      );

      const parent = screen.getByTestId('parent');
      const header = screen.getByTestId('header');
      const content = screen.getByTestId('content');
      const sidebar = screen.getByTestId('sidebar');
      const article = screen.getByTestId('article');
      const footer = screen.getByTestId('footer');

      expect(parent.tagName).toBe('MAIN');
      expect(header.tagName).toBe('HEADER');
      expect(content.tagName).toBe('DIV');
      expect(sidebar.tagName).toBe('ASIDE');
      expect(article.tagName).toBe('ARTICLE');
      expect(footer.tagName).toBe('FOOTER');

      expect(parent).toContainElement(header);
      expect(parent).toContainElement(content);
      expect(parent).toContainElement(footer);
      expect(content).toContainElement(sidebar);
      expect(content).toContainElement(article);

      expect(parent).toHaveClass('flex-col');
      expect(header).toHaveClass('justify-center');
      expect(content).toHaveClass('flex-row', 'justify-between');
      expect(sidebar).toHaveClass('flex-col');
      expect(footer).toHaveClass('justify-center');
    });

    it('handles responsive layouts', () => {
      render(
        <Flex
          direction="column"
          className="md:flex-row"
          gap={{ row: 2, column: 3 }}
          testId="flex"
        >
          <div>Content 1</div>
          <div>Content 2</div>
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('flex-col', 'md:flex-row');
      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 3)',
        rowGap: 'calc(var(--spacing) * 2)',
      });
      expect(flex).toHaveTextContent('Content 1');
      expect(flex).toHaveTextContent('Content 2');
    });
  });

  describe('prop forwarding', () => {
    it('forwards all props to the underlying element', () => {
      render(
        <Flex
          as="div"
          id="custom-id"
          title="Custom title"
          tabIndex={0}
          testId="flex"
        >
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex.tagName).toBe('DIV');
      expect(flex).toHaveAttribute('id', 'custom-id');
      expect(flex).toHaveAttribute('title', 'Custom title');
      expect(flex).toHaveAttribute('tabIndex', '0');
      expect(flex).toHaveClass('flex');
      expect(flex).toHaveTextContent('Content');
    });

    it('forwards data attributes', () => {
      render(
        <Flex testId="flex" data-custom="value" data-analytics="track">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveAttribute('data-custom', 'value');
      expect(flex).toHaveAttribute('data-analytics', 'track');
      expect(flex).toHaveTextContent('Content');
    });

    it('combines custom className with flex styles', () => {
      render(
        <Flex
          direction="column"
          className="bg-blue-500 text-white"
          testId="flex"
        >
          Styled flex
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveClass('bg-blue-500', 'text-white', 'flex', 'flex-col');
      expect(flex).toHaveTextContent('Styled flex');
    });

    it('preserves custom style properties', () => {
      render(
        <Flex
          style={{ backgroundColor: 'red', color: 'white' }}
          gap={{ row: 1, column: 2 }}
          testId="flex"
        >
          Custom styled
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveStyle({
        'background-color': 'rgb(255, 0, 0)',
        color: 'rgb(255, 255, 255)',
        'column-gap': 'calc(var(--spacing) * 2)',
        'row-gap': 'calc(var(--spacing) * 1)',
      });
      expect(flex).toHaveTextContent('Custom styled');
    });
  });

  describe('edge cases', () => {
    it('handles gap values with nothing', () => {
      render(<Flex testId="flex">Content</Flex>);
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 0)',
        rowGap: 'calc(var(--spacing) * 0)',
      });
      expect(flex).toHaveTextContent('Content');
    });

    it('handles number gap values', () => {
      render(
        <Flex gap={7} testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 7)',
        rowGap: 'calc(var(--spacing) * 7)',
      });
    });

    it('handles object gap values', () => {
      render(
        <Flex gap={{ row: 10, column: 15 }} testId="flex">
          Content
        </Flex>,
      );
      const flex = screen.getByTestId('flex');

      expect(flex).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 15)',
        rowGap: 'calc(var(--spacing) * 10)',
      });
    });
  });
});
