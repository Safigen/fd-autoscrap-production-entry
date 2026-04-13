import type React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Box } from './Box';
declare const frameVariants: (props?: ({
    color?: "default" | "danger" | "muted" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * A simple presentational component for framing content, with different color
 * options.
 */
declare function Frame({ className, children, color, ...props }: React.ComponentProps<typeof Box> & VariantProps<typeof frameVariants>): import("react/jsx-runtime").JSX.Element;
export { Frame };
//# sourceMappingURL=Frame.d.ts.map