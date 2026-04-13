import type React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { type VariantProps } from 'class-variance-authority';
declare const progressVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * A progress bar indicating completion status.
 */
declare function Progress({ className, size, value, children, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root> & VariantProps<typeof progressVariants>): import("react/jsx-runtime").JSX.Element;
/**
 * The filled portion of the progress bar.
 */
declare function ProgressIndicator({ className, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Indicator> & {
    value?: number | null;
}): import("react/jsx-runtime").JSX.Element;
export { Progress, ProgressIndicator, progressVariants };
//# sourceMappingURL=Progress.d.ts.map