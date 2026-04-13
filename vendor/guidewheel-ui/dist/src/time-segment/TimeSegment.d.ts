import type React from "react";
declare const timeSegmentVariants: (props?: ({
    state?: "runtime" | "idle" | "offline" | "planned" | "nodata" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface TimeSegmentOwnProps {
    /** Load state controlling the segment color. */
    state: "runtime" | "idle" | "offline" | "planned" | "nodata";
    /** Width as a percentage of the parent container (0-100). */
    widthPercent: number;
    /** Optional label shown as a tooltip (title attribute). */
    label?: string;
}
type TimeSegmentProps = Omit<React.ComponentProps<"span">, "title"> & TimeSegmentOwnProps;
/**
 * A pure CSS colored bar representing a time period in a timeline.
 *
 * Place multiple TimeSegments inside a flex container to compose
 * a full timeline bar (e.g., a 24-hour Gantt row).
 */
declare function TimeSegment({ className, state, widthPercent, label, ...props }: TimeSegmentProps): import("react/jsx-runtime").JSX.Element;
export { TimeSegment, timeSegmentVariants };
export type { TimeSegmentProps };
//# sourceMappingURL=TimeSegment.d.ts.map