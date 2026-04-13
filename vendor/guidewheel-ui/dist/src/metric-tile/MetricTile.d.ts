import type React from "react";
type MonitorMetricDisplayVariant = "primary" | "regular";
type OEETargetStatus = "on-target" | "off-target" | "at-risk" | "none";
interface MetricTileProps extends React.ComponentProps<"div"> {
    /** The metric value to display. When undefined, displays the placeholder. */
    value?: number | string;
    /** Unit of measurement (defaults to '%'). */
    unit?: string;
    /** Text shown when value is undefined (defaults to 'N/A'). */
    placeholder?: string;
    /** Display variant — 'primary' for larger OEE tile, 'regular' for A/P/Q. */
    variant?: MonitorMetricDisplayVariant;
    /** Target status — affects text colour in primary variant. */
    status?: OEETargetStatus;
    /** Whether the display is disabled (greyed out). */
    disabled?: boolean;
    /** Label displayed above the value (convenience prop). */
    label?: string;
    /** Size hint — kept for backward-compat with MetricCard consumers. */
    size?: "sm" | "md" | "lg";
}
/**
 * Metric value + unit display mirroring `MonitorMetricDisplay.vue`.
 *
 * - Value sizing adapts to character count (>4 chars = text-xl)
 * - Unit displayed next to value (not below)
 * - Bold font for values
 * - leading-none for compact layout
 */
declare function MetricTile({ value, unit, placeholder, variant, status, disabled, label, size: _size, className, children, ...props }: MetricTileProps): import("react/jsx-runtime").JSX.Element;
export { MetricTile };
export type { MetricTileProps, MonitorMetricDisplayVariant };
//# sourceMappingURL=MetricTile.d.ts.map