import type React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const tileVariants: (props?: ({
    size?: "md" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * A composable tile container component.
 */
declare function Tile({ className, size, ...props }: React.ComponentProps<'div'> & VariantProps<typeof tileVariants>): import("react/jsx-runtime").JSX.Element;
/**
 * Icon container component for Tile. Handles layout and styling of icon.
 */
declare function TileIcon({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
/**
 * Label component for Tile.
 *
 * Lays out label on a single line. Truncates (with ellipsis) to fit within tile.
 */
declare function TileLabel({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
export { Tile, TileIcon, TileLabel };
//# sourceMappingURL=Tile.d.ts.map