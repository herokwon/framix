import { render, screen } from '@testing-library/react';

import {
  ELEMENT_COLORS,
  HEADING_HTML_TAGS,
  HORIZONTAL_ALIGNMENTS,
} from '@data';

import { Heading } from './Heading';

describe('[UI] Heading', () => {
  describe('rendering', () => {
    it('renders with default', () => {
      render(<Heading>Title</Heading>);
      const heading = screen.getByRole('heading');

      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
      expect(heading).toHaveTextContent('Title');
    });

    it('renders with provided `as` tag', () => {
      render(<Heading as="h3">Section</Heading>);
      const heading = screen.getByRole('heading');

      expect(heading.tagName).toBe('H3');
      expect(heading).toHaveClass('text-title1 font-semibold');
    });

    it.each(HEADING_HTML_TAGS)('supports all allowed heading tags', tag => {
      render(
        <Heading as={tag} testId={`heading-${tag}`}>
          {tag}
        </Heading>,
      );
      const heading = screen.getByTestId(`heading-${tag}`);

      expect(heading.tagName).toBe(tag.toUpperCase());
      expect(heading).toHaveClass(
        tag === 'h1'
          ? 'font-extrabold'
          : tag === 'h2'
            ? 'font-bold'
            : 'font-semibold',
      );
    });
  });

  describe('color', () => {
    it.each(ELEMENT_COLORS)('applies each color token', color => {
      render(
        <Heading color={color} testId={`heading-color-${color}`}>
          {color}
        </Heading>,
      );
      const heading = screen.getByRole('heading');
      const colorValue = color === 'default' ? 'foreground' : color;

      expect(heading).toHaveClass(
        `text-${colorValue}-light dark:text-${colorValue}-dark`,
      );
    });

    it.each(HORIZONTAL_ALIGNMENTS)('applies alignment utilities', align => {
      render(
        <Heading align={align} testId={`heading-align-${align}`}>
          {align}
        </Heading>,
      );
      const heading = screen.getByRole('heading');

      if (align === 'left') {
        expect(heading).not.toHaveClass('text-left');
      } else {
        expect(heading).toHaveClass(`text-${align}`);
      }
    });
  });

  describe('prop forwarding', () => {
    it('merges className, forwards data attributes and custom testId', () => {
      render(
        <Heading
          testId="title"
          className="tracking-tight select-none"
          data-analytics="h"
          as="h2"
        >
          Subtitle
        </Heading>,
      );
      const heading = screen.getByRole('heading');

      expect(heading.tagName).toBe('H2');
      expect(heading).toHaveClass('select-none tracking-tight');
      expect(heading).toHaveAttribute('data-analytics', 'h');
      expect(heading).toHaveTextContent('Subtitle');
    });
  });
});
