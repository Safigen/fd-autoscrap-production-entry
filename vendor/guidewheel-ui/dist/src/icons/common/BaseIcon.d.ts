import type React from 'react';
import { type IconProps } from './variants';
interface BaseIconProps extends Omit<IconProps, 'size'> {
    children: React.ReactNode;
    size?: IconProps['size'];
}
/**
 * A flexible base component for rendering SVG icons with standardized
 * sizing and styling.
 *
 * The component integrates with IconContext to support inherited sizing.
 * Size precedence follows this order:
 * 1. Explicit `size` prop (highest priority)
 * 2. Size from IconContext (if available)
 * 3. Default size 'md' (fallback)
 *
 * @param size - Icon size variant. Takes precedence over context size.
 * @param children - SVG content to render inside the icon
 * @param className - Additional CSS classes to apply
 * @param props - Additional SVG element props
 *
 * @returns A styled SVG element containing the provided icon content
 */
declare function BaseIcon({ className, size, children, ...props }: BaseIconProps): import("react/jsx-runtime").JSX.Element;
export default BaseIcon;
//# sourceMappingURL=BaseIcon.d.ts.map