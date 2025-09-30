// =============================================================================
// Overlay Position Types
// =============================================================================
// These types model string literal placements used by floating / overlay UI
// elements (Tooltip, Dropdown, Popover, etc.). A position is expressed as a
// hyphen-joined pair of (axis, alignment) tokens. Two valid ordering patterns
// are supported:
//   1. vertical-first:  <top|bottom>-<left|center|right>
//   2. horizontal-first:<left|right>-<top|middle|bottom>
// This allows both forms like `top-left` and `left-top`.
//
// Design Notes:
// - The value 'middle-center' (true center in both axes) is intentionally
//   excluded; most overlay positioning systems treat centered placement as a
//   derived / fallback case rather than an explicit token.
// - We exclude `middle` when it is the first (vertical-first) token and
//   exclude `center` when it is the first (horizontal-first) token to avoid
//   ambiguous names like `middle-center`.
// - If a single canonical ordering is desired later (e.g. always vertical-first),
//   you can remove the second union branch and normalize inputs at runtime.
//
// Example valid values:
//   top-left, top-center, top-right,
//   bottom-left, bottom-center, bottom-right,
//   left-top, left-middle, left-bottom,
//   right-top, right-middle, right-bottom
//
// Example invalid values:
//   middle-left (first token cannot be 'middle')
//   left-center  (first token 'left' allows second token 'top|middle|bottom', not 'center')
//   middle-center (explicitly excluded)
//
// Runtime validation helper (optional) could be implemented as:
//   const OVERLAY_REGEX = /^(?:((top|bottom)-(left|center|right))|((left|right)-(top|middle|bottom)))$/;
//   export const isOverlayPosition = (v: string): v is OverlayPosition => OVERLAY_REGEX.test(v);
// =============================================================================
import type {
  CONTENT_ALIGNMENTS,
  HORIZONTAL_ALIGNMENTS,
  ITEMS_ALIGNMENTS,
  VERTICAL_ALIGNMENTS,
} from '@data';

import type { StrictExclude } from './common';

export type ContentAlignment = (typeof CONTENT_ALIGNMENTS)[number];
export type ItemsAlignment = (typeof ITEMS_ALIGNMENTS)[number];

/** All allowed horizontal alignment tokens derived from data constants. */
export type HorizontalAlignment = (typeof HORIZONTAL_ALIGNMENTS)[number];
/** All allowed vertical alignment tokens derived from data constants. */
export type VerticalAlignment = (typeof VERTICAL_ALIGNMENTS)[number];

/**
 * A string literal describing an overlay placement.
 *
 * Two structural patterns are allowed:
 *  - vertical-first: `${top|bottom}-${left|center|right}` (vertical excludes 'middle')
 *  - horizontal-first: `${left|right}-${top|middle|bottom}` (horizontal excludes 'center')
 *
 * See module header comments for detailed rationale and examples.
 */
export type OverlayPosition =
  | `${StrictExclude<VerticalAlignment, 'middle'>}-${HorizontalAlignment}`
  | `${StrictExclude<HorizontalAlignment, 'center'>}-${VerticalAlignment}`;
