import { type VariantProps } from 'class-variance-authority';
declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "danger" | "success" | "warning" | "outline" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type BadgeProps = React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>;
declare function Badge({ className, variant, size, children, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
export type { BadgeProps };
//# sourceMappingURL=Badge.d.ts.map