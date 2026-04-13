import type React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { chipVariants } from './common/variants';
interface ChipOwnProps {
    children: React.ReactNode;
}
type ChipProps = React.ComponentProps<'span'> & VariantProps<typeof chipVariants> & ChipOwnProps;
/**
 * A presentational chip component for displaying labels and text corraled in a
 * lozenge-shaped container.
 */
declare function Chip({ children, className, size, ...props }: ChipProps): import("react/jsx-runtime").JSX.Element;
export { Chip };
export type { ChipProps };
//# sourceMappingURL=Chip.d.ts.map