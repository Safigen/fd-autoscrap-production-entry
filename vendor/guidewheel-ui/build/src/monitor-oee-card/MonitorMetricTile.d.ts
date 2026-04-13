import type React from "react";
import type { ToggleExpandEvent } from "./MonitorTileBase";
type OEEMetricId = "availability" | "performance" | "quality";
interface MonitorMetricTileProps {
    /** Unique identifier for this tile. */
    tileId: OEEMetricId;
    /** Display title. */
    title: string;
    /** Numeric metric value. */
    value?: number;
    /** Unit of measurement. */
    unit?: string;
    /** Placeholder text when value is undefined. */
    placeholder?: string;
    /** Whether the tile can be expanded. */
    expandable?: boolean;
    /** Whether the tile is currently expanded. */
    expanded?: boolean;
    /** Whether to use emphasized (prominent) styling. */
    emphasized?: boolean;
    /** Whether any tile in the group is expanded. */
    anyExpanded?: boolean;
    /** Function to get the layout classes from parent. */
    getLayoutClasses?: (expanded: boolean, anyExpanded: boolean) => string;
    /** Expand toggle callback. */
    onToggleExpand?: (event: ToggleExpandEvent) => void;
    /** Footer content (e.g. "15 min Unplanned"). */
    footerSlot?: React.ReactNode;
    /** Expanded content. */
    expandedContentSlot?: React.ReactNode;
}
/**
 * Metric tile for A/P/Q mirroring `MonitorMetricTile.vue`.
 *
 * Wraps `MonitorTileBase` with:
 * - Title with info indicator
 * - Metric value display
 * - Footer text
 * - Expandable content
 * - Emphasized styling for the most off-target metric
 */
declare function MonitorMetricTile({ tileId, title, value, unit, placeholder, expandable, expanded, emphasized, anyExpanded, getLayoutClasses, onToggleExpand, footerSlot, expandedContentSlot, }: MonitorMetricTileProps): import("react/jsx-runtime").JSX.Element;
export { MonitorMetricTile };
export type { MonitorMetricTileProps };
//# sourceMappingURL=MonitorMetricTile.d.ts.map