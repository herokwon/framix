import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Grid } from './Grid';

describe('[Layouts] Grid', () => {
  describe('rendering', () => {
    it('renders as div by default', () => {
      render(<Grid testId="grid">Content</Grid>);
      const grid = screen.getByTestId('grid');

      expect(grid.tagName).toBe('DIV');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveTextContent('Content');
    });

    it('renders with custom className', () => {
      render(
        <Grid testId="grid" className="rounded-md border p-4">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('p-4', 'rounded-md', 'border', 'grid');
      expect(grid).toHaveTextContent('Content');
    });

    it('renders children correctly', () => {
      render(
        <Grid testId="grid">
          <span>Child 1</span>
          <span>Child 2</span>
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveTextContent('Child 1');
      expect(grid).toHaveTextContent('Child 2');
    });

    it('applies default prop values', () => {
      render(<Grid testId="grid">Content</Grid>);
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass(
        'grid',
        'justify-start',
        'content-start',
        'place-items-stretch',
      );
      expect(grid).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 0)',
        rowGap: 'calc(var(--spacing) * 0)',
      });
    });
  });

  describe('polymorphic behavior', () => {
    it('renders as main when as="main"', () => {
      render(
        <Grid as="main" testId="grid">
          Main content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid.tagName).toBe('MAIN');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveTextContent('Main content');
    });

    it('renders as section when as="section"', () => {
      render(
        <Grid as="section" testId="grid">
          Section content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid.tagName).toBe('SECTION');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveTextContent('Section content');
    });

    it('renders as article when as="article"', () => {
      render(
        <Grid as="article" testId="grid">
          Article content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid.tagName).toBe('ARTICLE');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveTextContent('Article content');
    });

    it('renders as aside when as="aside"', () => {
      render(
        <Grid as="aside" testId="grid">
          Aside content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid.tagName).toBe('ASIDE');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveTextContent('Aside content');
    });

    it('renders as header when as="header"', () => {
      render(
        <Grid as="header" testId="grid">
          Header content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid.tagName).toBe('HEADER');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveTextContent('Header content');
    });

    it('renders as footer when as="footer"', () => {
      render(
        <Grid as="footer" testId="grid">
          Footer content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid.tagName).toBe('FOOTER');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveTextContent('Footer content');
    });
  });

  describe('templateColumns prop', () => {
    it('applies repeat pattern with number', () => {
      render(
        <Grid templateColumns={{ repeat: 3, size: '1fr' }} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateColumns: 'repeat(3, 1fr)',
      });
    });

    it('applies repeat pattern with auto-fill', () => {
      render(
        <Grid
          templateColumns={{ repeat: 'auto-fill', size: 'minmax(100px, 1fr)' }}
          testId="grid"
        >
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      });
    });

    it('applies repeat pattern with auto-fit', () => {
      render(
        <Grid
          templateColumns={{ repeat: 'auto-fit', size: 'minmax(120px, 1fr)' }}
          testId="grid"
        >
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      });
    });

    it('applies repeat pattern with default size', () => {
      render(
        <Grid templateColumns={{ repeat: 2 }} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateColumns: 'repeat(2, 1fr)',
      });
    });

    it('applies array of custom sizes', () => {
      render(
        <Grid templateColumns={['100px', '1fr', '2fr']} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateColumns: '100px 1fr 2fr',
      });
    });

    it('does not apply gridTemplateColumns when undefined', () => {
      render(<Grid testId="grid">Content</Grid>);
      const grid = screen.getByTestId('grid');

      expect(grid.style.gridTemplateColumns).toBe('');
    });
  });

  describe('templateRows prop', () => {
    it('applies repeat pattern with number', () => {
      render(
        <Grid templateRows={{ repeat: 2, size: '100px' }} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateRows: 'repeat(2, 100px)',
      });
    });

    it('applies repeat pattern with auto-fill', () => {
      render(
        <Grid
          templateRows={{ repeat: 'auto-fill', size: 'minmax(80px, 1fr)' }}
          testId="grid"
        >
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateRows: 'repeat(auto-fill, minmax(80px, 1fr))',
      });
    });

    it('applies array of custom sizes', () => {
      render(
        <Grid templateRows={['60px', '120px', '1fr']} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateRows: '60px 120px 1fr',
      });
    });

    it('applies default size when size is not provided', () => {
      render(
        <Grid templateRows={{ repeat: 3 }} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateRows: 'repeat(3, 1fr)',
      });
    });

    it('does not apply gridTemplateRows when undefined', () => {
      render(<Grid testId="grid">Content</Grid>);
      const grid = screen.getByTestId('grid');

      expect(grid.style.gridTemplateRows).toBe('');
    });
  });

  describe('justifyContent prop', () => {
    it('applies justify-start class for start justification', () => {
      render(
        <Grid justifyContent="start" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('justify-start');
    });

    it('applies justify-center class for center justification', () => {
      render(
        <Grid justifyContent="center" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('justify-center');
    });

    it('applies justify-end class for end justification', () => {
      render(
        <Grid justifyContent="end" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('justify-end');
    });

    it('applies justify-around class for space-around justification', () => {
      render(
        <Grid justifyContent="space-around" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('justify-around');
    });

    it('applies justify-between class for space-between justification', () => {
      render(
        <Grid justifyContent="space-between" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('justify-between');
    });

    it('applies justify-evenly class for space-evenly justification', () => {
      render(
        <Grid justifyContent="space-evenly" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('justify-evenly');
    });
  });

  describe('alignContent prop', () => {
    it('applies content-start class for start alignment', () => {
      render(
        <Grid alignContent="start" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('content-start');
    });

    it('applies content-center class for center alignment', () => {
      render(
        <Grid alignContent="center" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('content-center');
    });

    it('applies content-end class for end alignment', () => {
      render(
        <Grid alignContent="end" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('content-end');
    });

    it('applies content-stretch class for stretch alignment', () => {
      render(
        <Grid alignContent="stretch" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('content-stretch');
    });

    it('applies content-around class for space-around alignment', () => {
      render(
        <Grid alignContent="space-around" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('content-around');
    });

    it('applies content-between class for space-between alignment', () => {
      render(
        <Grid alignContent="space-between" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('content-between');
    });

    it('applies content-evenly class for space-evenly alignment', () => {
      render(
        <Grid alignContent="space-evenly" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('content-evenly');
    });
  });

  describe('placeItems prop', () => {
    it('applies place-items-start class for start placement', () => {
      render(
        <Grid placeItems="start" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('place-items-start');
    });

    it('applies place-items-center class for center placement', () => {
      render(
        <Grid placeItems="center" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('place-items-center');
    });

    it('applies place-items-end class for end placement', () => {
      render(
        <Grid placeItems="end" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('place-items-end');
    });

    it('applies place-items-stretch class for stretch placement', () => {
      render(
        <Grid placeItems="stretch" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('place-items-stretch');
    });

    it('applies place-items-baseline class for baseline placement', () => {
      render(
        <Grid placeItems="baseline" testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('place-items-baseline');
    });
  });

  describe('gap prop', () => {
    it('applies default gap values when gap is not provided', () => {
      render(<Grid testId="grid">Content</Grid>);
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 0)',
        rowGap: 'calc(var(--spacing) * 0)',
      });
    });

    it('applies uniform gap when gap is a number', () => {
      render(
        <Grid gap={2} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 2)',
        rowGap: 'calc(var(--spacing) * 2)',
      });
    });

    it('applies custom column gap only', () => {
      render(
        <Grid gap={{ column: 3 }} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 3)',
        rowGap: 'calc(var(--spacing) * 0)',
      });
    });

    it('applies custom row gap only', () => {
      render(
        <Grid gap={{ row: 1 }} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 0)',
        rowGap: 'calc(var(--spacing) * 1)',
      });
    });

    it('applies both row and column gaps', () => {
      render(
        <Grid gap={{ row: 2, column: 3 }} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 3)',
        rowGap: 'calc(var(--spacing) * 2)',
      });
    });

    it('handles empty gap object', () => {
      render(
        <Grid gap={{}} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 0)',
        rowGap: 'calc(var(--spacing) * 0)',
      });
    });
  });

  describe('combined props', () => {
    it('applies multiple grid properties correctly', () => {
      render(
        <Grid
          templateColumns={{ repeat: 3, size: '1fr' }}
          templateRows={{ repeat: 2, size: '100px' }}
          justifyContent="center"
          alignContent="stretch"
          placeItems="center"
          gap={{ row: 1, column: 2 }}
          testId="grid"
        >
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass(
        'grid',
        'justify-center',
        'content-stretch',
        'place-items-center',
      );
      expect(grid).toHaveStyle({
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 100px)',
        columnGap: 'calc(var(--spacing) * 2)',
        rowGap: 'calc(var(--spacing) * 1)',
      });
    });

    it('applies complex template and alignment combinations', () => {
      render(
        <Grid
          templateColumns={['100px', '1fr', '2fr']}
          justifyContent="space-between"
          alignContent="space-evenly"
          placeItems="baseline"
          gap={3}
          testId="grid"
        >
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass(
        'grid',
        'justify-between',
        'content-evenly',
        'place-items-baseline',
      );
      expect(grid).toHaveStyle({
        gridTemplateColumns: '100px 1fr 2fr',
        columnGap: 'calc(var(--spacing) * 3)',
        rowGap: 'calc(var(--spacing) * 3)',
      });
    });
  });

  describe('event handling', () => {
    it('handles click events when rendered as button', async () => {
      const handleClick = vi.fn();
      render(
        <Grid as="button" onClick={handleClick} testId="grid">
          Click me
        </Grid>,
      );
      const button = screen.getByTestId('grid');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveClass('grid');
      expect(button).toHaveTextContent('Click me');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse events', async () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      render(
        <Grid
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          testId="grid"
        >
          Hover me
        </Grid>,
      );
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveTextContent('Hover me');

      await userEvent.hover(grid);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      await userEvent.unhover(grid);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events on focusable elements', async () => {
      const handleKeyDown = vi.fn();
      render(
        <Grid as="div" tabIndex={0} onKeyDown={handleKeyDown} testId="grid">
          Press me
        </Grid>,
      );
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveAttribute('tabIndex', '0');
      expect(grid).toHaveTextContent('Press me');

      grid.focus();
      await userEvent.keyboard('{Enter}');
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('supports aria attributes', () => {
      render(
        <Grid
          aria-describedby="description"
          testId="grid"
          label="Custom grid container"
        >
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveAttribute('aria-label', 'Custom grid container');
      expect(grid).toHaveAttribute('aria-describedby', 'description');
      expect(grid).toHaveTextContent('Content');
    });

    it('supports role attribute', () => {
      render(
        <Grid role="presentation" testId="grid">
          Presentation content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveAttribute('role', 'presentation');
      expect(grid).toHaveTextContent('Presentation content');
    });

    it('supports semantic HTML elements for accessibility', () => {
      render(
        <Grid as="main" testId="grid">
          <Grid as="section" testId="section">
            <h2>Section Title</h2>
            <p>Section content</p>
          </Grid>
        </Grid>,
      );
      const main = screen.getByTestId('grid');
      const section = screen.getByTestId('section');

      expect(main.tagName).toBe('MAIN');
      expect(section.tagName).toBe('SECTION');
      expect(main).toHaveClass('grid');
      expect(section).toHaveClass('grid');
    });
  });

  describe('complex content', () => {
    it('renders nested Grid components correctly', () => {
      render(
        <Grid
          as="main"
          templateColumns={{ repeat: 2, size: '1fr' }}
          testId="parent"
        >
          <Grid
            as="header"
            templateColumns={{ repeat: 3, size: '1fr' }}
            testId="header"
          >
            Header
          </Grid>
          <Grid
            as="div"
            templateColumns={['200px', '1fr']}
            gap={2}
            testId="content"
          >
            <Grid as="aside" testId="sidebar">
              Sidebar
            </Grid>
            <Grid as="article" testId="article">
              Article content
            </Grid>
          </Grid>
          <Grid as="footer" justifyContent="center" testId="footer">
            Footer
          </Grid>
        </Grid>,
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

      expect(parent).toHaveStyle('gridTemplateColumns: repeat(2, 1fr)');
      expect(header).toHaveStyle('gridTemplateColumns: repeat(3, 1fr)');
      expect(content).toHaveStyle('gridTemplateColumns: 200px 1fr');
      expect(footer).toHaveClass('justify-center');
    });

    it('handles responsive grid layouts', () => {
      render(
        <Grid
          templateColumns={{ repeat: 'auto-fit', size: 'minmax(250px, 1fr)' }}
          className="lg:grid-cols-4"
          gap={2}
          testId="grid"
        >
          <div>Card 1</div>
          <div>Card 2</div>
          <div>Card 3</div>
          <div>Card 4</div>
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('lg:grid-cols-4');
      expect(grid).toHaveStyle({
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        columnGap: 'calc(var(--spacing) * 2)',
        rowGap: 'calc(var(--spacing) * 2)',
      });
    });
  });

  describe('prop forwarding', () => {
    it('forwards all props to the underlying element', () => {
      render(
        <Grid
          as="div"
          id="custom-id"
          title="Custom title"
          tabIndex={0}
          testId="grid"
        >
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid.tagName).toBe('DIV');
      expect(grid).toHaveAttribute('id', 'custom-id');
      expect(grid).toHaveAttribute('title', 'Custom title');
      expect(grid).toHaveAttribute('tabIndex', '0');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveTextContent('Content');
    });

    it('forwards data attributes', () => {
      render(
        <Grid testId="grid" data-custom="value" data-analytics="track">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveAttribute('data-custom', 'value');
      expect(grid).toHaveAttribute('data-analytics', 'track');
      expect(grid).toHaveTextContent('Content');
    });

    it('combines custom className with grid styles', () => {
      render(
        <Grid
          templateColumns={{ repeat: 2, size: '1fr' }}
          className="bg-blue-500 text-white"
          testId="grid"
        >
          Styled grid
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass(
        'bg-blue-500',
        'text-white',
        'grid',
        'justify-start',
        'content-start',
        'place-items-stretch',
      );
      expect(grid).toHaveTextContent('Styled grid');
    });

    it('preserves custom style properties', () => {
      render(
        <Grid
          style={{
            backgroundColor: 'rgb(255, 0, 0)',
            color: 'rgb(255, 255, 255)',
          }}
          gap={{ row: 1, column: 2 }}
          testId="grid"
        >
          Custom styled
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        backgroundColor: 'rgb(255, 0, 0)',
        color: 'rgb(255, 255, 255)',
        columnGap: 'calc(var(--spacing) * 2)',
        rowGap: 'calc(var(--spacing) * 1)',
      });
      expect(grid).toHaveTextContent('Custom styled');
    });
  });

  describe('edge cases', () => {
    it('handles undefined template values gracefully', () => {
      render(
        <Grid
          templateColumns={undefined}
          templateRows={undefined}
          testId="grid"
        >
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid.style.gridTemplateColumns).toBe('');
      expect(grid.style.gridTemplateRows).toBe('');
    });

    it('handles number gap values', () => {
      render(
        <Grid gap={7} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 7)',
        rowGap: 'calc(var(--spacing) * 7)',
      });
    });

    it('handles object gap values', () => {
      render(
        <Grid gap={{ row: 10, column: 15 }} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        columnGap: 'calc(var(--spacing) * 15)',
        rowGap: 'calc(var(--spacing) * 10)',
      });
    });

    it('handles complex template array with single element', () => {
      render(
        <Grid templateColumns={['100%']} testId="grid">
          Content
        </Grid>,
      );
      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        gridTemplateColumns: '100%',
      });
    });

    it('handles auto-fill and auto-fit patterns correctly', () => {
      const { rerender } = render(
        <Grid
          templateColumns={{ repeat: 'auto-fill', size: '200px' }}
          testId="grid"
        >
          Content
        </Grid>,
      );
      let grid = screen.getByTestId('grid');
      expect(grid).toHaveStyle('gridTemplateColumns: repeat(auto-fill, 200px)');

      rerender(
        <Grid
          templateColumns={{ repeat: 'auto-fit', size: '200px' }}
          testId="grid"
        >
          Content
        </Grid>,
      );
      grid = screen.getByTestId('grid');
      expect(grid).toHaveStyle('gridTemplateColumns: repeat(auto-fit, 200px)');
    });
  });
});
