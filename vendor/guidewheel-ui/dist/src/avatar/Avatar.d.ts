import { type VariantProps } from 'class-variance-authority';
declare const avatarVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type AvatarProps = React.ComponentProps<'div'> & VariantProps<typeof avatarVariants>;
declare function Avatar({ className, size, children, ...props }: AvatarProps): import("react/jsx-runtime").JSX.Element;
type AvatarImageProps = React.ComponentProps<'img'> & {
    onLoadError?: () => void;
};
declare function AvatarImage({ className, onLoadError, onError, ...props }: AvatarImageProps): import("react/jsx-runtime").JSX.Element | null;
type AvatarFallbackProps = React.ComponentProps<'div'>;
declare function AvatarFallback({ className, children, ...props }: AvatarFallbackProps): import("react/jsx-runtime").JSX.Element;
export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps };
//# sourceMappingURL=Avatar.d.ts.map