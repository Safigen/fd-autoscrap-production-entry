import type React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const statusIndicatorVariants: (props?: ({
    variant?: "dot" | "bar" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    state?: "runtime" | "idle" | "offline" | "planned" | "nodata" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type StatusIndicatorProps = React.ComponentProps<'span'> & VariantProps<typeof statusIndicatorVariants>;
/**
 * A pure CSS colored dot or bar showing device load state.
 *
 * Use `variant="dot"` for inline status indicators next to text,
 * or `variant="bar"` for horizontal bars in charts and timelines.
 */
declare function StatusIndicator({ className, variant, size, state, ...props }: StatusIndicatorProps): import("react/jsx-runtime").JSX.Element;
export { StatusIndicator, statusIndicatorVariants };
export type { StatusIndicatorProps };
//# sourceMappingURL=StatusIndicator.d.ts.map