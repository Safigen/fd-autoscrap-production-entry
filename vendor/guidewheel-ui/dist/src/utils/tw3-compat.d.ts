/**
 * Tailwind 3 compatibility utilities
 *
 * This module contains workarounds and helpers for TW3 that will need
 * to be updated/removed when upgrading to Tailwind 4.
 */
/**
 * In TW, this can be done entirely with CSS variables, allowing UI components
 * to accept spacing props in an abstracted way.
 *
 * This function assumes no variation from TW's default spacing scale in which
 * 1 unit = 0.25rem.
 *
 * @returns A CSS length string in `rem` units.
 *
 * @example
 * ```ts
 * spacingLength(4) // '1rem'
 * ```
 */
export declare const spacingLength: (value: number) => string;
//# sourceMappingURL=tw3-compat.d.ts.map