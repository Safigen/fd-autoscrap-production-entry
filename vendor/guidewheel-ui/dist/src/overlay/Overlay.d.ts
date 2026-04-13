import type React from 'react';
type OverlayProps = React.ComponentProps<'div'> & {
    open?: boolean;
};
/**
 * A blocking overlay that can be used to dim the background and prevent
 * interaction with the underlying content.
 *
 * **Note**: This component exists to solve a specific and urgent use case, but
 * is not part of the design system and lacks some a11y details. Do not use
 * generally.
 */
export declare function Overlay({ className, open, ...props }: OverlayProps): import("react/jsx-runtime").JSX.Element | null;
/**
 * Content centered on both axes within the overlay.
 */
export declare function OverlayContent({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Overlay.d.ts.map