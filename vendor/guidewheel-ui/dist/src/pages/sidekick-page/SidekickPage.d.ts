import type { SafiChartSeries } from "../../safi-chart/SafiChart";
import type { LoadStateSegment } from "../../uptime-gantt-chart/UptimeGanttChart";
type DeviceState = "runtime" | "idle" | "offline" | "planned" | "nodata";
type SidekickDevice = {
    id: string;
    name: string;
    state: DeviceState;
};
type SidekickIssue = {
    id: string;
    status: "open" | "acknowledged" | "closed";
    startTime: string;
    stopTime: string;
    tags: Array<{
        name: string;
        color?: string;
    }>;
};
type SidekickPageProps = {
    /** Available devices for the device selector */
    devices?: SidekickDevice[];
    /** Initially selected device ID */
    selectedDeviceId?: string;
    /** Gantt chart timeline segments */
    ganttSegments?: LoadStateSegment[];
    /** SafiChart time-series data (e.g. power consumption). Required for the chart to render. */
    chartSeries?: SafiChartSeries[];
    /** Time range for the chart [from, to] in epoch ms. Defaults to gantt segment bounds. */
    chartTimeRange?: {
        from: number;
        to: number;
    };
    /** Issues for the selected device */
    issues?: SidekickIssue[];
    /** Whether data is loading */
    isLoading?: boolean;
    className?: string;
};
/**
 * Full-page Sidekick/HMI composition mirroring the Vue OperatorTagging/index.vue.
 *
 * Layout (top to bottom):
 * 1. Device status bar with background color matching device state
 * 2. SidekickFilters (device selector + status filter)
 * 3. Summary stats row
 * 4. Gantt chart bar (24px height) -- mirrors .gant-chart
 * 5. Chart area placeholder (fills remaining space) -- mirrors SafiChart
 * 6. Issues section with SidekickIssueCards -- mirrors IssuesSection
 * 7. Action buttons (Add Scrap, New Issue)
 *
 * No NavigationShell: the Sidekick view is a standalone mobile-first HMI
 * that fills the entire viewport, matching the Vue operatorTagging layout.
 */
declare function SidekickPage({ devices, selectedDeviceId, ganttSegments, chartSeries, chartTimeRange, issues, isLoading, className, }: SidekickPageProps): import("react/jsx-runtime").JSX.Element;
export { SidekickPage };
export type { SidekickPageProps, SidekickDevice, SidekickIssue };
//# sourceMappingURL=SidekickPage.d.ts.map