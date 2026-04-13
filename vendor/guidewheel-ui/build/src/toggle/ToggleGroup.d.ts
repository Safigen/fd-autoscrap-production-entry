import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';
import { toggleVariants } from './common/variants';
declare const toggleGroupVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleGroupVariants> & {
    spacing?: number;
    size?: VariantProps<typeof toggleVariants>['size'];
};
/**
 * A set of two-state buttons that can be toggled on or off.
 */
declare function ToggleGroup({ className, children, spacing, orientation, variant, size, ...props }: ToggleGroupProps): import("react/jsx-runtime").JSX.Element;
/**
 * An item within a ToggleGroup.
 *
 * Will apply Toggle `size` variant styling.
 *
 * Note that this does not directly use the Toggle component from this library.
 * For more control over items in ToggleGroups, use `asChild` and compose with
 * a Toggle component.
 *
 * @example
 * <ToggleGroup variant="outline">
 *   <ToggleGroupItem asChild>
 *     <Toggle><SomeIcon />Whatever you want in here</Toggle>
 *   </ToggleGroupItem>
 * </ToggleGroup>
 */
declare function ToggleGroupItem({ className, children, size, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>): import("react/jsx-runtime").JSX.Element;
export { ToggleGroup, ToggleGroupItem };
//# sourceMappingURL=ToggleGroup.d.ts.map