import type React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const bannerVariants: (props?: ({
    variant?: "danger" | "success" | "warning" | "info" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type BannerProps = React.ComponentProps<'div'> & VariantProps<typeof bannerVariants> & {
    /** When true, shows a close button that hides the banner on click. */
    dismissible?: boolean;
    /** Callback fired when the banner is dismissed. */
    onDismiss?: () => void;
};
/**
 * A notification banner with semantic color variants.
 */
declare function Banner({ className, variant, dismissible, onDismiss, children, ...props }: BannerProps): import("react/jsx-runtime").JSX.Element | null;
export { Banner, bannerVariants };
//# sourceMappingURL=Banner.d.ts.map