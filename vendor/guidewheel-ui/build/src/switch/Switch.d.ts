import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { type VariantProps } from 'class-variance-authority';
/**
 * Size math derived from:
 * https://github.com/radix-ui/themes/blob/c508125ad71cc0425fe40c87af9c88991e0b4080/packages/radix-ui-themes/src/components/switch.css
 *
 * Formula:
 *   - Root height = root width / 1.75
 *   - Thumb size = root width / 2
 */
declare const switchVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * A control that allows the user to toggle between checked and not checked.
 */
declare function Switch({ className, size, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof switchVariants>): import("react/jsx-runtime").JSX.Element;
export { Switch };
//# sourceMappingURL=Switch.d.ts.map