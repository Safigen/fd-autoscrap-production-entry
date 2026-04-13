import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps } from 'class-variance-authority';
declare const labelVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Renders an accessible label associated with controls.
 */
declare function Label({ className, size, ...props }: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>): import("react/jsx-runtime").JSX.Element;
export { Label };
//# sourceMappingURL=Label.d.ts.map