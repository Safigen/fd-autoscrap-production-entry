import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps } from 'class-variance-authority';
import { toggleVariants } from './common/variants';
export type ToggleIndicatorProps = React.ComponentProps<'div'> & {
    indeterminate?: boolean;
};
/**
 * Visual indicator for toggles.
 *
 * Currently the only variant is a checkbox-style indicator. We may wish to
 * extend to provide a radio-button visual variant in future.
 */
declare function ToggleIndicator({ className, children, indeterminate, ...props }: ToggleIndicatorProps): import("react/jsx-runtime").JSX.Element;
/**
 * A two-state button that can be either on or off.
 */
declare function Toggle({ className, size, children, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>): import("react/jsx-runtime").JSX.Element;
export { Toggle, ToggleIndicator };
//# sourceMappingURL=Toggle.d.ts.map