import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  return twMerge(clsx(...inputs));
}
