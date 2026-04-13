import type { ToggleExpandEvent } from "./MonitorTileBase";
type OEEMetricId = "availability" | "performance" | "quality";
type GetLayoutClassesFn = (expanded: boolean, anyExpanded: boolean) => string;
interface MonitorTileGroupProps {
    /** Function that determines the column-span classes based on tile state. */
    getLayoutClasses: GetLayoutClassesFn;
    /** Callback when any tile's expand state changes. */
    onToggleExpand?: (event: ToggleExpandEvent) => void;
    /** Render prop receiving group state. */
    children: (context: {
        expandedTileId: OEEMetricId | null;
        anyExpanded: boolean;
        toggleExpand: (event: ToggleExpandEvent) => void;
        getLayoutClasses: GetLayoutClassesFn;
    }) => React.ReactNode;
}
/**
 * Expansion state manager mirroring `MonitorTileGroup.vue`.
 *
 * Wraps children in a 12-column grid and tracks which tile (if any)
 * is currently expanded.
 */
declare function MonitorTileGroup({ getLayoutClasses, onToggleExpand, children, }: MonitorTileGroupProps): import("react/jsx-runtime").JSX.Element;
export { MonitorTileGroup };
export type { MonitorTileGroupProps, OEEMetricId, GetLayoutClassesFn };
//# sourceMappingURL=MonitorTileGroup.d.ts.map