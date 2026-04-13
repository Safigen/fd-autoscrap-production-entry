import { type VariantProps } from 'class-variance-authority';
import { type BoxProps } from './Box';
declare const componentVariants: (props?: ({
    variant?: "page" | "panel" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type MainContentProps = BoxProps & VariantProps<typeof componentVariants>;
/**
 * `MainContent` is a container for all the  content associated with a page or
 * view.
 *
 * There should only be one `MainContent` per page or view.
 *
 * `MainContent` sets padding (can be overridden) but does not establish layout.
 */
declare function MainContent({ className, children, variant, ...props }: MainContentProps): import("react/jsx-runtime").JSX.Element;
export { MainContent };
//# sourceMappingURL=MainContent.d.ts.map