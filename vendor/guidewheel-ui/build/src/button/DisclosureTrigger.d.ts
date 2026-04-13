import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Button } from './Button';
declare const disclosureTriggerVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type DisclosureTriggerProps = Omit<React.ComponentProps<typeof Button>, 'variant' | 'color' | 'size'> & VariantProps<typeof disclosureTriggerVariants>;
/**
 * Opinonated button design pattern for disclosure triggers (Popover, Dialog,
 * AlertDialog, Select, etc.).
 *
 * Styles based on `data-state` attribute set by Radix trigger components.
 * Displays a chevron indicator at right.
 */
declare function DisclosureTrigger({ className, size, children, ...props }: DisclosureTriggerProps): import("react/jsx-runtime").JSX.Element;
type DisclosureTriggerIndicatorProps = React.ComponentProps<'span'>;
/**
 * Chevron indicator for disclosure triggers.
 *
 * Rotates 180° when the parent trigger's `data-state` is "open".
 * Must be used as a child of `DisclosureTrigger`.
 */
declare function DisclosureTriggerIndicator({ className, ...props }: DisclosureTriggerIndicatorProps): import("react/jsx-runtime").JSX.Element;
export { DisclosureTrigger, DisclosureTriggerIndicator };
export type { DisclosureTriggerIndicatorProps, DisclosureTriggerProps };
//# sourceMappingURL=DisclosureTrigger.d.ts.map