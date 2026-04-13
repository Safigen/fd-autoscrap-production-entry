import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { solidButtonVariants, textButtonVariants } from './common/variants';
declare const variantConfigs: {
    readonly solid: (props?: ({
        color?: "default" | "primary" | "secondary" | "danger" | null | undefined;
        size?: "sm" | "md" | "lg" | "icon" | null | undefined;
    } & import("class-variance-authority/types").ClassProp) | undefined) => string;
    readonly text: (props?: ({
        color?: "default" | "primary" | "secondary" | "danger" | null | undefined;
        size?: "sm" | "md" | "lg" | "icon" | null | undefined;
    } & import("class-variance-authority/types").ClassProp) | undefined) => string;
};
type ButtonVariant = keyof typeof variantConfigs;
type SolidButtonProps = VariantProps<typeof solidButtonVariants>;
type TextButtonProps = VariantProps<typeof textButtonVariants>;
interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'color'> {
    variant?: ButtonVariant;
    color?: NonNullable<SolidButtonProps['color']> | NonNullable<TextButtonProps['color']>;
    size?: NonNullable<SolidButtonProps['size']> | NonNullable<TextButtonProps['size']>;
    asChild?: boolean;
    loading?: boolean;
}
/**
 * A button component!
 *
 */
declare function Button({ className, color, variant, size, asChild, loading, onClick, children, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export { Button };
//# sourceMappingURL=Button.d.ts.map