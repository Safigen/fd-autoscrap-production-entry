import type React from 'react';
import { type VariantProps } from 'class-variance-authority';
import type { chipVariants } from './common/variants';
interface TagChipOwnProps {
    children: React.ReactNode;
    /**
     * CSS color for color indicator (displays as colored circle).
     * Takes any valid CSS color, including hex, rgb, hsl, CSS custom properties
     * (e.g. `var(--color-primary)`).
     *
     */
    color?: string;
}
type TagChipProps = React.ComponentProps<'span'> & VariantProps<typeof chipVariants> & TagChipOwnProps;
/**
 * A presentational chip component for displaying status, labels, or categories
 * with optional color indicators.
 */
declare function TagChip({ children, color, ...chipProps }: TagChipProps): import("react/jsx-runtime").JSX.Element;
export { TagChip };
export type { TagChipProps };
//# sourceMappingURL=TagChip.d.ts.map