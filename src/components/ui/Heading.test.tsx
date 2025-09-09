import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { ELEMENT_COLORS, HEADING_HTML_TAGS } from '@data';

import Heading from './Heading';

describe('[UI] Heading', () => {
  describe('rendering', () => {
    it('renders with defaults', () => {
      render(<Heading>Title</Heading>);
      const el = screen.getByTestId('heading');

      expect(el).toBeInTheDocument();
      expect(el.tagName).toBe('H1');
      expect(el).toHaveTextContent('Title');
      expect(el.className).toEqual(expect.stringContaining('text-heading1'));
      expect(el.className).toEqual(expect.stringContaining('font-extrabold'));
      expect(el.className).toEqual(
        expect.stringContaining('text-foreground-light'),
      );
    });

    it('respects provided `as` tag', () => {
      render(<Heading as="h3">Section</Heading>);
      const el = screen.getByTestId('heading');

      expect(el.tagName).toBe('H3');
      expect(el.className).toEqual(expect.stringContaining('text-title1'));
      expect(el.className).toEqual(expect.stringContaining('font-semibold'));
    });

    it('supports all allowed heading tags', () => {
      render(
        <>
          {HEADING_HTML_TAGS.map(tag => (
            <Heading key={tag} as={tag} testId={`heading-${tag}`}>
              {tag}
            </Heading>
          ))}
        </>,
      );

      HEADING_HTML_TAGS.forEach(tag => {
        const el = screen.getByTestId(`heading-${tag}`);

        expect(el.tagName).toBe(tag.toUpperCase());
        expect(el).toHaveTextContent(tag);
      });
    });
  });

  describe('styling', () => {
    it('applies each color token', () => {
      render(
        <>
          {ELEMENT_COLORS.map(c => (
            <Heading key={c} color={c} testId={`heading-color-${c}`}>
              color-{c}
            </Heading>
          ))}
        </>,
      );
      const colorToToken: Record<string, string> = {
        default: 'text-foreground-light',
        primary: 'text-primary-light',
        success: 'text-success-light',
        danger: 'text-danger-light',
        warning: 'text-warning-light',
        info: 'text-info-light',
      };

      ELEMENT_COLORS.forEach(c => {
        const el = screen.getByTestId(`heading-color-${c}`);
        expect(el.className).toEqual(expect.stringContaining(colorToToken[c]));
      });
    });

    it('applies alignment utilities', () => {
      render(
        <>
          {(['left', 'center', 'right'] as const).map(a => (
            <Heading key={a} align={a} testId={`heading-align-${a}`}>
              {a}
            </Heading>
          ))}
        </>,
      );
      const alignToClass: Record<string, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      };
      const leftEl = screen.getByTestId('heading-align-left');

      expect(leftEl.className).not.toEqual(
        expect.stringContaining('text-center'),
      );
      expect(leftEl.className).not.toEqual(
        expect.stringContaining('text-right'),
      );

      (['center', 'right'] as const).forEach(a => {
        const el = screen.getByTestId(`heading-align-${a}`);
        expect(el.className).toEqual(expect.stringContaining(alignToClass[a]));
      });
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
      const el = screen.getByTestId('title');

      expect(el.tagName).toBe('H2');
      expect(el).toHaveClass('select-none', 'tracking-tight');
      expect(el).toHaveAttribute('data-analytics', 'h');
      expect(el).toHaveTextContent('Subtitle');
    });
  });
});
