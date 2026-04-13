import type React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const sectionVariants: (props?: ({
    size?: "md" | "lg" | "xl" | null | undefined;
    color?: "default" | "danger" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Guidewheel design pattern presentational component for a section of a page.
 */
declare function PageSection({ className, children, size, color, ...props }: React.ComponentProps<'div'> & VariantProps<typeof sectionVariants>): import("react/jsx-runtime").JSX.Element;
export { PageSection };
//# sourceMappingURL=PageSection.d.ts.map