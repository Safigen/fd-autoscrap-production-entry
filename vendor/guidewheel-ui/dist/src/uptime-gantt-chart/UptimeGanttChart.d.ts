/**
 * Exact load-state colors from the Vue UptimeGanttChart.vue constants.
 *
 * These match the original RGBA values used in the Highcharts Gantt chart:
 * - OFFLINE: rgba(254, 104, 71, 1)
 * - IDLE: rgba(241, 194, 50, 1)
 * - ONLINE/runtime: rgba(13, 195, 159, 1)
 * - PLANNED: rgba(112, 77, 209, 1)
 * - NODATA: rgb(223, 220, 220)
 */
declare const LOAD_STATE_COLORS: {
    readonly offline: "rgba(254, 104, 71, 1)";
    readonly idle: "rgba(241, 194, 50, 1)";
    readonly runtime: "rgba(13, 195, 159, 1)";
    readonly online: "rgba(13, 195, 159, 1)";
    readonly planned: "rgba(112, 77, 209, 1)";
    readonly nodata: "rgb(223, 220, 220)";
};
type LoadStateSegment = {
    start: number;
    end: number;
    state: keyof typeof LOAD_STATE_COLORS;
};
type UptimeGanttChartProps = {
    /** Load state segments to render as colored bars. */
    segments?: LoadStateSegment[];
    /** Whether data is currently loading. */
    loading?: boolean;
    /** Height of the chart area in pixels. Defaults to 40px matching the Vue skeleton-loader. */
    height?: number;
    className?: string;
};
/**
 * Uptime Gantt chart matching the Vue UptimeGanttChart.vue component.
 *
 * Renders a single-row horizontal timeline bar showing device load states
 * (offline, idle, online/runtime, planned, nodata) using exact Vue RGBA colors.
 *
 * Three visual states matching the Vue template:
 * 1. Loading: a skeleton-loader placeholder at 40px height
 * 2. Data: colored segment bars filling the chart area
 * 3. Empty: "No data" text when no segments are provided
 */
declare function UptimeGanttChart({ segments, loading, height, className, }: UptimeGanttChartProps): import("react/jsx-runtime").JSX.Element;
export { UptimeGanttChart, LOAD_STATE_COLORS };
export type { UptimeGanttChartProps, LoadStateSegment };
//# sourceMappingURL=UptimeGanttChart.d.ts.map