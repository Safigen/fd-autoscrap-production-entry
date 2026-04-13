import type React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const iconVariants: (props?: ({
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type IconProps = React.ComponentProps<'svg'> & VariantProps<typeof iconVariants>;
export { IconProvider, useIconContext } from './IconContext';
//# sourceMappingURL=variants.d.ts.map