import { render, screen } from '@testing-library/react';

import {
  ELEMENT_COLORS,
  ELEMENT_SIZES,
  HORIZONTAL_ALIGNMENTS,
  TEXT_HTML_TAGS,
} from '@data';

import Text from './Text';

describe('[UI] Text', () => {
  describe('rendering', () => {
    it('renders with defaults', () => {
      render(<Text>Plain text</Text>);
      const text = screen.getByTestId('text');

      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass(
        'text-body2 text-foreground-light dark:text-foreground-dark',
      );
      expect(text).toHaveTextContent('Plain text');
    });

    it('renders with provided `as` tag', () => {
      render(<Text as="code">Snippet</Text>);
      const text = screen.getByTestId('text');

      expect(text.tagName).toBe('CODE');
      expect(text).toHaveTextContent('Snippet');
    });

    it.each(TEXT_HTML_TAGS)('supports all allowed text tags', tag => {
      render(
        <Text as={tag} testId={`text-${tag}`}>
          {tag}
        </Text>,
      );
      const text = screen.getByTestId(`text-${tag}`);

      expect(text.tagName).toBe(tag.toUpperCase());
      expect(text).toHaveTextContent(tag);
    });
  });

  describe('color', () => {
    it.each(ELEMENT_COLORS)('applies each color token', color => {
      render(
        <Text color={color} testId={`text-color-${color}`}>
          {color}
        </Text>,
      );
      const text = screen.getByTestId(`text-color-${color}`);
      const colorValue = color === 'default' ? 'foreground' : color;

      expect(text).toHaveClass(
        `text-${colorValue}-light dark:text-${colorValue}-dark`,
      );
    });

    it('inverts light/dark tokens when isColorInverted is true', () => {
      const { rerender } = render(
        <Text color="primary" testId="primary">
          inverted-primary
        </Text>,
      );
      const primary = screen.getByTestId('primary');

      expect(primary).toHaveClass('text-primary-light dark:text-primary-dark');

      rerender(
        <Text color="primary" isColorInverted testId="inverted-primary" />,
      );
      const invertedPrimary = screen.getByTestId('inverted-primary');

      expect(invertedPrimary).toHaveClass(
        'text-primary-dark dark:text-primary-light',
      );
    });
  });

  describe('size', () => {
    it.each(ELEMENT_SIZES)('applies each size token', size => {
      render(
        <Text key={size} size={size} testId={`text-size-${size}`}>
          size-{size}
        </Text>,
      );
      const text = screen.getByTestId(`text-size-${size}`);

      expect(text).toHaveClass(
        `text-body${size === 'sm' ? '3' : size === 'md' ? '2' : '1'}`,
      );
      expect(text).toHaveTextContent(`size-${size}`);
    });
  });

  describe('alignment', () => {
    it.each(HORIZONTAL_ALIGNMENTS)('applies alignment utilities', align => {
      render(
        <Text align={align} testId={`text-align-${align}`}>
          {align}
        </Text>,
      );
      const text = screen.getByTestId(`text-align-${align}`);

      if (align === 'left') {
        expect(text).not.toHaveClass('text-left');
      } else {
        expect(text).toHaveClass(`text-${align}`);
      }
      expect(text).toHaveTextContent(align);
    });
  });

  describe('weight', () => {
    it.each(['normal', 'medium', 'semibold', 'bold'] as const)(
      'applies font weight utilities',
      weight => {
        render(
          <Text weight={weight} testId={`text-weight-${weight}`}>
            {weight}
          </Text>,
        );
        const text = screen.getByTestId(`text-weight-${weight}`);

        if (weight === 'normal') {
          expect(text).not.toHaveClass('font-normal');
        } else {
          expect(text).toHaveClass(`font-${weight}`);
        }
        expect(text).toHaveTextContent(weight);
      },
    );
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
      const text = screen.getByTestId('typography');

      expect(text.tagName).toBe('STRONG');
      expect(text).toHaveClass('tracking-tight', 'custom');
      expect(text).toHaveAttribute('data-analytics', 'text');
      expect(text).toHaveTextContent('Bold');
    });
  });
});
