/**
 * Utility for combining and merging CSS class names intelligently.
 *
 * This function combines the power of `clsx` (for conditional class name
 * construction) with `tailwind-merge` (for resolving Tailwind CSS conflicts).
 *
 * Features:
 * - Handles conditional class names like clsx
 * - Automatically resolves conflicting Tailwind utility classes
 * - Filters out falsy values
 *
 * @example
 * ```ts
 * // Basic usage
 * cn('px-4', 'py-2', 'bg-blue-500')
 * // → 'px-4 py-2 bg-blue-500'
 *
 * // Conditional classes
 * cn('base-class', isActive && 'active-class', {
 *   'conditional-class': someCondition
 * })
 *
 * // Tailwind conflict resolution (later classes override earlier ones)
 * cn('px-4', 'px-6')
 * // → 'px-6' (not 'px-4 px-6')
 *
 * cn('text-red-500', 'text-blue-500')
 * // → 'text-blue-500' (not 'text-red-500 text-blue-500')
 * ```
 *
 * Adapted from shadcn/ui for consistent class name handling across components.
 */
import { type ClassValue } from 'clsx';
export declare function cn(...inputs: ClassValue[]): string;
//# sourceMappingURL=cn.d.ts.map