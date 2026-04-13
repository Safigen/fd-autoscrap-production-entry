import type React from "react";
type OEETargetStatus = "on-target" | "off-target" | "at-risk" | "none";
interface MonitorPrimaryMetricTileProps {
    /** Tile title (e.g. "OEE"). */
    title: string;
    /** Numeric value to display. */
    value?: number;
    /** Unit of measurement. */
    unit?: string;
    /** Placeholder when no value. */
    placeholder?: string;
    /** Target status — drives background colour. */
    status?: OEETargetStatus;
    /** Tooltip content rendered beside the title. */
    tooltipSlot?: React.ReactNode;
}
/**
 * Primary metric tile mirroring `MonitorPrimaryMetricTile.vue`.
 *
 * Displays the main OEE value with status-based background:
 * - on-target: transparent
 * - off-target: red background
 * - at-risk: yellow background
 * - none + no value: stone-50 background
 */
declare function MonitorPrimaryMetricTile({ title, value, unit, placeholder, status, tooltipSlot, }: MonitorPrimaryMetricTileProps): import("react/jsx-runtime").JSX.Element;
export { MonitorPrimaryMetricTile };
export type { MonitorPrimaryMetricTileProps };
//# sourceMappingURL=MonitorPrimaryMetricTile.d.ts.map