import type React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const flexVariants: (props?: ({
    direction?: "col" | "row" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type AnyFlexComponentProps = React.ComponentProps<'div'> & {
    /** Set gap between items, in spacing units */
    spacing?: number;
};
type FlexProps = AnyFlexComponentProps & VariantProps<typeof flexVariants> & {
    asChild?: boolean;
};
/**
 * A thin abstraction around a flex container.
 */
declare function Flex({ asChild, className, direction, spacing, ...props }: FlexProps): import("react/jsx-runtime").JSX.Element;
/**
 * Convenience wrapper around Flex to set the direction to row.
 */
declare function FlexRow({ ...props }: AnyFlexComponentProps): import("react/jsx-runtime").JSX.Element;
/**
 * Convenience wrapper around Flex to set the direction to column.
 */
declare function FlexColumn({ ...props }: AnyFlexComponentProps): import("react/jsx-runtime").JSX.Element;
export { Flex, FlexRow, FlexColumn };
//# sourceMappingURL=Flex.d.ts.map