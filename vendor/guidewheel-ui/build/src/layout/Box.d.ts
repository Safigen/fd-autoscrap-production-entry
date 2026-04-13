import type React from 'react';
export type BoxProps = React.ComponentProps<'div'> & {
    asChild?: boolean;
};
/**
 * An extremely thin abstraction around a div. This marks the div as a layout
 * and presentational component.
 */
declare function Box({ asChild, className, ...props }: BoxProps): import("react/jsx-runtime").JSX.Element;
export { Box };
//# sourceMappingURL=Box.d.ts.map