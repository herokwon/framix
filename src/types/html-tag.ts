import type {
  BUTTON_HTML_TAGS,
  HEADING_HTML_TAGS,
  TEXT_HTML_TAGS,
} from '@data';

export type ButtonHtmlTag = (typeof BUTTON_HTML_TAGS)[number];
export type HeadingHtmlTag = (typeof HEADING_HTML_TAGS)[number];
export type TextHtmlTag = (typeof TEXT_HTML_TAGS)[number];
