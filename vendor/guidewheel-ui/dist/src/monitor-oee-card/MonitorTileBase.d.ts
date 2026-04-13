import type React from "react";
interface ToggleExpandEvent {
    expandId: string;
    expanded: boolean;
}
interface MonitorTileBaseProps {
    /** Whether the tile can be expanded. */
    expandable?: boolean;
    /** Whether the tile is currently expanded. */
    expanded?: boolean;
    /** Unique identifier for expand/collapse (required when expandable). */
    expandId?: string;
    /** Additional CSS classes for styling the tile. */
    baseClasses?: string;
    /** Callback when the tile's expand state is toggled. */
    onToggleExpand?: (event: ToggleExpandEvent) => void;
    /** Slot: title content. */
    titleSlot?: React.ReactNode;
    /** Slot: tooltip content. */
    tooltipSlot?: React.ReactNode;
    /** Slot: main content. */
    contentSlot?: React.ReactNode;
    /** Slot: expanded content (shown when expanded). */
    expandedContentSlot?: React.ReactNode;
}
/**
 * Base tile component mirroring `MonitorTileBase.vue`.
 *
 * Renders as `<button>` when expandable, `<div>` when not.
 * Handles expand/collapse toggle and layout.
 */
declare function MonitorTileBase({ expandable, expanded, expandId, baseClasses, onToggleExpand, titleSlot, tooltipSlot, contentSlot, expandedContentSlot, }: MonitorTileBaseProps): import("react/jsx-runtime").JSX.Element;
export { MonitorTileBase };
export type { MonitorTileBaseProps, ToggleExpandEvent };
//# sourceMappingURL=MonitorTileBase.d.ts.map