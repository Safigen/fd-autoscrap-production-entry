type ScoreboardView = {
    id: string;
    name: string;
    type: "devices" | "devicesLists" | "segments";
    devices: string[];
    devicesLists: string[];
};
type DeviceListTile = {
    id: string;
    name: string;
    runtime: number;
    average30Day: number;
    average7Day: number;
    average2Day: number;
    plannedDowntime?: number;
    shiftName?: string;
    deviceCount: number;
    devices: string[];
};
type DeviceTile = {
    id: string;
    name: string;
    runtime: number;
    metric: string;
    metricValue: number;
    metricUnit: string;
    state: "success" | "warning" | "danger";
};
type ScoreboardPageProps = {
    /** The selected view configuration. */
    views?: ScoreboardView[];
    /** Device list tiles for the devices-lists view type. */
    deviceListTiles?: DeviceListTile[];
    /** Device tiles for the devices view type or drill-down. */
    deviceTiles?: DeviceTile[];
    /** Whether data is loading. */
    isLoading?: boolean;
    /** Whether the scoreboard is in fullscreen mode. */
    isFullScreen?: boolean;
    /** Empty state - no views configured. */
    isEmpty?: boolean;
    className?: string;
};
/**
 * ScoreboardPage -- mirrors Vue Dashboard/index.vue (the Scoreboard).
 *
 * This is the admin-level scoreboard view with:
 * - Configurable views (devices, device lists, segments)
 * - Device list tiles with runtime percentages and drill-down
 * - Device tiles with metric values
 * - Map view toggle
 * - Fullscreen mode
 * - Search and filtering
 * - Shift mode with date/shift selection
 * - Live mode with auto-pagination
 *
 * NOT to be confused with the Home/Summary page (DashboardPage).
 */
declare function ScoreboardPage({ views, deviceListTiles, deviceTiles, isLoading, isFullScreen, isEmpty, className, }: ScoreboardPageProps): import("react/jsx-runtime").JSX.Element;
export { ScoreboardPage };
export type { ScoreboardPageProps, ScoreboardView, DeviceListTile, DeviceTile, };
//# sourceMappingURL=ScoreboardPage.d.ts.map