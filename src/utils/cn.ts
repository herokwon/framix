import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const HEADING_CLASS_COUNT = 2;
const TITLE_CLASS_COUNT = 2;
const BODY_CLASS_COUNT = 3;

const twMergeCustom = extendTailwindMerge({
  override: {
    classGroups: {
      'font-size': [
        ...Array.from(
          { length: HEADING_CLASS_COUNT },
          (_, i) => `text-heading${i + 1}`,
        ),
        ...Array.from(
          { length: TITLE_CLASS_COUNT },
          (_, i) => `text-title${i + 1}`,
        ),
        ...Array.from(
          { length: BODY_CLASS_COUNT },
          (_, i) => `text-body${i + 1}`,
        ),
      ],
      shadow: [
        'shadow-outline',
        'shadow-overlay',
        'shadow-clickable',
        'shadow-clickable-hover',
        'shadow-clickable-active',
      ],
    },
  },
});

/**
 * Merges CSS class names with Tailwind CSS conflict resolution.
 * Combines multiple class values using clsx and resolves Tailwind conflicts with twMerge.
 *
 * @param inputs - Class values to merge (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 *
 * @example
 * cn('text-red-500', 'text-blue-500') // Returns 'text-blue-500'
 * cn('px-4', { 'py-2': true, 'hidden': false }) // Returns 'px-4 py-2'
 */
export default function cn(...inputs: ClassValue[]) {
  return twMergeCustom(clsx(...inputs));
}
