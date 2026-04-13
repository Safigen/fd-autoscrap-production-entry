type MonitorMetricDisplayVariant = "primary" | "regular";
type OEETargetStatus = "on-target" | "off-target" | "at-risk" | "none";
interface MonitorMetricDisplayProps {
    /** Numeric value to display. When undefined, shows placeholder. */
    value?: number;
    /** Unit of measurement (defaults to '%'). */
    unit?: string;
    /** Text shown when value is undefined (defaults to 'N/A'). */
    placeholder?: string;
    /** 'primary' for OEE tile (larger), 'regular' for A/P/Q. */
    variant?: MonitorMetricDisplayVariant;
    /** Target status — affects text colour in primary variant. */
    status?: OEETargetStatus;
    /** Whether the display is disabled (greyed out). */
    disabled?: boolean;
}
/**
 * Value + unit display mirroring `MonitorMetricDisplay.vue`.
 */
declare function MonitorMetricDisplay({ value, unit, placeholder, variant, status, disabled, }: MonitorMetricDisplayProps): import("react/jsx-runtime").JSX.Element;
export { MonitorMetricDisplay };
export type { MonitorMetricDisplayProps, MonitorMetricDisplayVariant };
//# sourceMappingURL=MonitorMetricDisplay.d.ts.map