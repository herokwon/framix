import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ELEMENT_SIZES } from '@data';

import { Container } from '@layouts';

describe('[Layouts] Container', () => {
  describe('rendering', () => {
    it('renders as section by default', () => {
      render(<Container data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');

      expect(container.tagName).toBe('SECTION');
      expect(container).toHaveTextContent('Content');
    });

    it('renders with custom className', () => {
      render(
        <Container data-testid="container" className="rounded-md border p-4">
          Content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveClass('p-4', 'rounded-md', 'border');
      expect(container).toHaveTextContent('Content');
    });

    it('renders children correctly', () => {
      render(
        <Container data-testid="container">
          <span>Child 1</span>
          <span>Child 2</span>
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveTextContent('Child 1');
      expect(container).toHaveTextContent('Child 2');
    });
  });

  describe('polymorphic behavior', () => {
    it('renders as main when as="main"', () => {
      render(
        <Container as="main" data-testid="container">
          Main content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container.tagName).toBe('MAIN');
      expect(container).toHaveTextContent('Main content');
    });

    it('renders as div when as="div"', () => {
      render(
        <Container as="div" data-testid="container">
          Div content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container.tagName).toBe('DIV');
      expect(container).toHaveTextContent('Div content');
    });

    it('renders as article when as="article"', () => {
      render(
        <Container as="article" data-testid="container">
          Article content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container.tagName).toBe('ARTICLE');
      expect(container).toHaveTextContent('Article content');
    });

    it('renders as aside when as="aside"', () => {
      render(
        <Container as="aside" data-testid="container">
          Aside content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container.tagName).toBe('ASIDE');
      expect(container).toHaveTextContent('Aside content');
    });

    it('renders as header when as="header"', () => {
      render(
        <Container as="header" data-testid="container">
          Header content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container.tagName).toBe('HEADER');
      expect(container).toHaveTextContent('Header content');
    });

    it('renders as footer when as="footer"', () => {
      render(
        <Container as="footer" data-testid="container">
          Footer content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container.tagName).toBe('FOOTER');
      expect(container).toHaveTextContent('Footer content');
    });

    it('renders as dialog when as="dialog"', () => {
      render(
        <Container as="dialog" data-testid="container">
          Dialog content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container.tagName).toBe('DIALOG');
      expect(container).toHaveTextContent('Dialog content');
    });
  });

  describe('container behavior', () => {
    it('applies fixed container styles when fixed=true', () => {
      render(
        <Container fixed={true} data-testid="container">
          Fixed container
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveClass('container');
      expect(container).toHaveTextContent('Fixed container');
    });

    it('applies w-full by default when fixed=false and no maxWidth', () => {
      render(
        <Container fixed={false} data-testid="container">
          Fluid container
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveClass('w-full');
      expect(container).toHaveTextContent('Fluid container');
    });

    it('applies w-full when no fixed prop and no maxWidth', () => {
      render(<Container data-testid="container">Default container</Container>);
      const container = screen.getByTestId('container');

      expect(container).toHaveClass('w-full');
      expect(container).toHaveTextContent('Default container');
    });

    it('applies max-width styles when maxWidth is specified', () => {
      render(
        <Container maxWidth="sm" data-testid="container">
          Small container
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveClass('sm:max-w-[40rem]');
      expect(container).toHaveTextContent('Small container');
    });

    it('applies correct max-width for different sizes', () => {
      const { rerender } = render(
        <Container maxWidth="md" data-testid="container">
          Medium container
        </Container>,
      );
      let container = screen.getByTestId('container');
      expect(container).toHaveClass('md:max-w-3xl');

      rerender(
        <Container maxWidth="lg" data-testid="container">
          Large container
        </Container>,
      );
      container = screen.getByTestId('container');
      expect(container).toHaveClass('lg:max-w-5xl');

      rerender(
        <Container maxWidth="xl" data-testid="container">
          Extra large container
        </Container>,
      );
      container = screen.getByTestId('container');
      expect(container).toHaveClass('xl:max-w-7xl');
    });

    it('ignores maxWidth when fixed=true', () => {
      render(
        <Container fixed={true} data-testid="container">
          Fixed container with ignored maxWidth
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveClass('container');
      expect(container).not.toHaveClass('sm:max-w-[40rem]');
      expect(container).not.toHaveClass('md:max-w-3xl');
      expect(container).not.toHaveClass('lg:max-w-5xl');
      expect(container).not.toHaveClass('xl:max-w-7xl');
      expect(container).toHaveTextContent(
        'Fixed container with ignored maxWidth',
      );
    });
  });

  describe('event handling', () => {
    it('handles click events when rendered as button-like element', async () => {
      const handleClick = vi.fn();
      render(
        <Container
          as="div"
          onClick={handleClick}
          data-testid="container"
          role="button"
          tabIndex={0}
        >
          Clickable container
        </Container>,
      );
      const container = screen.getByTestId('container');
      expect(container).toHaveAttribute('role', 'button');
      expect(container).toHaveAttribute('tabIndex', '0');
      expect(container).toHaveTextContent('Clickable container');

      await userEvent.click(container);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse events', async () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      render(
        <Container
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-testid="container"
        >
          Hover me
        </Container>,
      );
      const container = screen.getByTestId('container');
      expect(container).toHaveTextContent('Hover me');

      await userEvent.hover(container);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      await userEvent.unhover(container);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('supports aria attributes', () => {
      render(
        <Container
          aria-label="Custom container"
          aria-describedby="description"
          data-testid="container"
        >
          Content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveAttribute('aria-label', 'Custom container');
      expect(container).toHaveAttribute('aria-describedby', 'description');
      expect(container).toHaveTextContent('Content');
    });

    it('supports role attribute', () => {
      render(
        <Container role="banner" data-testid="container">
          Banner content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveAttribute('role', 'banner');
      expect(container).toHaveTextContent('Banner content');
    });

    it('supports semantic HTML elements for accessibility', () => {
      render(
        <Container as="main" data-testid="container">
          <Container as="header" data-testid="header">
            Header
          </Container>
          <Container as="article" data-testid="article">
            Article content
          </Container>
          <Container as="aside" data-testid="aside">
            Sidebar
          </Container>
          <Container as="footer" data-testid="footer">
            Footer
          </Container>
        </Container>,
      );

      const main = screen.getByTestId('container');
      const header = screen.getByTestId('header');
      const article = screen.getByTestId('article');
      const aside = screen.getByTestId('aside');
      const footer = screen.getByTestId('footer');

      expect(main.tagName).toBe('MAIN');
      expect(header.tagName).toBe('HEADER');
      expect(article.tagName).toBe('ARTICLE');
      expect(aside.tagName).toBe('ASIDE');
      expect(footer.tagName).toBe('FOOTER');
    });
  });

  describe('complex content', () => {
    it('renders nested Container components correctly', () => {
      render(
        <Container as="main" data-testid="parent">
          <Container as="header" fixed={true} data-testid="header">
            Header
          </Container>
          <Container as="div" maxWidth="lg" data-testid="content">
            <Container as="article" data-testid="article">
              Article content
            </Container>
          </Container>
          <Container as="footer" data-testid="footer">
            Footer
          </Container>
        </Container>,
      );

      const parent = screen.getByTestId('parent');
      const header = screen.getByTestId('header');
      const content = screen.getByTestId('content');
      const article = screen.getByTestId('article');
      const footer = screen.getByTestId('footer');

      expect(parent.tagName).toBe('MAIN');
      expect(header.tagName).toBe('HEADER');
      expect(content.tagName).toBe('DIV');
      expect(article.tagName).toBe('ARTICLE');
      expect(footer.tagName).toBe('FOOTER');

      expect(parent).toContainElement(header);
      expect(parent).toContainElement(content);
      expect(parent).toContainElement(footer);
      expect(content).toContainElement(article);

      expect(header).toHaveClass('container');
      expect(content).toHaveClass('lg:max-w-5xl');
      expect(footer).toHaveClass('w-full');
    });
  });

  describe('prop forwarding', () => {
    it('forwards all props to the underlying element', () => {
      render(
        <Container
          as="div"
          id="custom-id"
          title="Custom title"
          tabIndex={0}
          data-testid="container"
        >
          Content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container.tagName).toBe('DIV');
      expect(container).toHaveAttribute('id', 'custom-id');
      expect(container).toHaveAttribute('title', 'Custom title');
      expect(container).toHaveAttribute('tabIndex', '0');
      expect(container).toHaveTextContent('Content');
    });

    it('forwards data attributes', () => {
      render(
        <Container
          data-testid="container"
          data-custom="value"
          data-analytics="track"
        >
          Content
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveAttribute('data-custom', 'value');
      expect(container).toHaveAttribute('data-analytics', 'track');
      expect(container).toHaveTextContent('Content');
    });

    it('combines custom className with container styles', () => {
      render(
        <Container
          fixed={true}
          className="bg-blue-500 text-white"
          data-testid="container"
        >
          Styled container
        </Container>,
      );
      const container = screen.getByTestId('container');

      expect(container).toHaveClass('bg-blue-500', 'text-white', 'container');
      expect(container).toHaveTextContent('Styled container');
    });
  });

  describe('type safety', () => {
    it('works with all valid element sizes', () => {
      ELEMENT_SIZES.forEach(size => {
        render(
          <Container maxWidth={size} data-testid={`container-${size}`}>
            {size} container
          </Container>,
        );
        const container = screen.getByTestId(`container-${size}`);
        const expectedClasses = {
          sm: 'sm:max-w-[40rem]',
          md: 'md:max-w-3xl',
          lg: 'lg:max-w-5xl',
          xl: 'xl:max-w-7xl',
        };

        expect(container).toHaveClass(expectedClasses[size]);
        expect(container).toHaveTextContent(`${size} container`);
      });
    });
  });
});
