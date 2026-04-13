import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { type VariantProps } from 'class-variance-authority';
declare const defaultCheckboxVariants: (props?: ({
    size?: "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * A control that allows the user to toggle between checked and not checked,
 * or an indeterminate state.
 */
declare function Checkbox({ className, size: sizeProp, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof defaultCheckboxVariants>): import("react/jsx-runtime").JSX.Element;
export { Checkbox };
//# sourceMappingURL=Checkbox.d.ts.map