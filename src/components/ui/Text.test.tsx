import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { ELEMENT_COLORS, ELEMENT_SIZES, TEXT_HTML_TAGS } from '@data';

import Text from './Text';

describe('[UI] Text', () => {
  describe('rendering', () => {
    it('renders with defaults (falls back to <span>)', () => {
      render(<Text>Plain text</Text>);
      const el = screen.getByTestId('text');

      expect(el.tagName).toBe('SPAN');
      expect(el).toHaveTextContent('Plain text');
      expect(el.className).toEqual(expect.stringContaining('text-body2'));
      expect(el.className).toEqual(
        expect.stringContaining('text-foreground-light'),
      );
    });

    it('respects provided `as` tag', () => {
      render(<Text as="code">Snippet</Text>);
      const el = screen.getByTestId('text');

      expect(el.tagName).toBe('CODE');
      expect(el).toHaveTextContent('Snippet');
    });

    it('supports all allowed HTML tags', () => {
      render(
        <>
          {TEXT_HTML_TAGS.map(tag => (
            <Text key={tag} as={tag} testId={`text-${tag}`}>
              {tag}
            </Text>
          ))}
        </>,
      );

      TEXT_HTML_TAGS.forEach(tag => {
        const el = screen.getByTestId(`text-${tag}`);

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
            <Text key={c} color={c} testId={`text-color-${c}`}>
              color-{c}
            </Text>
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
        const el = screen.getByTestId(`text-color-${c}`);
        expect(el.className).toEqual(expect.stringContaining(colorToToken[c]));
      });
    });

    it('applies each size mapping', () => {
      render(
        <>
          {ELEMENT_SIZES.map(s => (
            <Text key={s} size={s} testId={`text-size-${s}`}>
              size-{s}
            </Text>
          ))}
        </>,
      );
      const sizeToToken: Record<string, string> = {
        sm: 'text-body3',
        md: 'text-body2',
        lg: 'text-body1',
      };

      ELEMENT_SIZES.forEach(s => {
        const el = screen.getByTestId(`text-size-${s}`);
        expect(el.className).toEqual(expect.stringContaining(sizeToToken[s]));
      });
    });

    it('applies alignment utilities', () => {
      render(
        <>
          {(['left', 'center', 'right'] as const).map(a => (
            <Text key={a} align={a} testId={`text-align-${a}`}>
              {a}
            </Text>
          ))}
        </>,
      );
      const alignToClass: Record<string, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      };
      const leftEl = screen.getByTestId('text-align-left');

      expect(leftEl.className).not.toEqual(
        expect.stringContaining('text-center'),
      );
      expect(leftEl.className).not.toEqual(
        expect.stringContaining('text-right'),
      );

      (['center', 'right'] as const).forEach(a => {
        const el = screen.getByTestId(`text-align-${a}`);
        expect(el.className).toEqual(expect.stringContaining(alignToClass[a]));
      });
    });

    it('applies weight utilities', () => {
      render(
        <>
          {(['normal', 'medium', 'semibold', 'bold'] as const).map(w => (
            <Text key={w} weight={w} testId={`text-weight-${w}`}>
              {w}
            </Text>
          ))}
        </>,
      );
      const weightToClass: Record<string, string> = {
        normal: '',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      };
      const normalEl = screen.getByTestId('text-weight-normal');

      expect(normalEl.className).not.toEqual(expect.stringContaining('font-'));

      (['medium', 'semibold', 'bold'] as const).forEach(w => {
        const el = screen.getByTestId(`text-weight-${w}`);
        expect(el.className).toEqual(expect.stringContaining(weightToClass[w]));
      });
    });
  });

  describe('prop forwarding', () => {
    it('merges className, forwards data attributes and custom testId', () => {
      render(
        <Text
          as="strong"
          testId="typography"
          className="custom tracking-tight"
          data-analytics="text"
        >
          Bold
        </Text>,
      );
      const el = screen.getByTestId('typography');

      expect(el.tagName).toBe('STRONG');
      expect(el).toHaveClass('tracking-tight', 'custom');
      expect(el).toHaveAttribute('data-analytics', 'text');
      expect(el).toHaveTextContent('Bold');
    });
  });
});
