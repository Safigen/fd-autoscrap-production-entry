/** Feature flags that mirror Vue `SAFI_CHART_FEATURES` enum. */
export type SafiChartFeature = "load-curve" | "coarse-state" | "stock-load-curve" | "device-scraps" | "new-issue" | "cycle-count" | "thresholds" | "speedlines" | "ml-tagging" | "range" | "compare-multi-curves" | "sum-multi-curves" | "second-level-multi-curves" | "dnd-windows" | "custom-thresholds" | "anomaly-detection" | "coarse-state-region-feature";
export type SafiChartSeries = {
    /** Display name shown in tooltip and legend. */
    name: string;
    /** Time-series data points (timestamp in ms, value in device metric unit). */
    data: Array<{
        timestamp: number;
        value: number;
    }>;
    /** Optional series color. Falls back to the chart palette. */
    color?: string;
    /** Series type override; defaults to "line". */
    type?: "line" | "area" | "bar";
};
export type ThresholdLine = {
    /** Label for the threshold (e.g. "Online Threshold"). */
    label: string;
    /** Y-axis value where the line is drawn. */
    value: number;
    /** Line color. Defaults to a warning color. */
    color?: string;
    /** Dash style for the line. */
    dashStyle?: "solid" | "dashed" | "dotted";
};
export type CoarseStateRegion = {
    /** Start timestamp (ms). */
    from: number;
    /** End timestamp (ms). */
    to: number;
    /** State determines the background color of the region. */
    state: "runtime" | "idle" | "offline" | "planned";
    /** Optional label shown in tooltip. */
    label?: string;
};
export type SafiChartProps = {
    /** One or more time-series to render (load curve, multi-device overlay, etc.). */
    series: SafiChartSeries[];
    /** Start of the visible time range (epoch ms). */
    from: number;
    /** End of the visible time range (epoch ms). */
    to: number;
    /** Device name shown as chart title. */
    deviceName?: string;
    /** Metric unit label for the y-axis (e.g. "kW", "amps", "g"). */
    metricUnit?: string;
    /** Chart height in pixels. Defaults to 400. */
    height?: number;
    /** Whether the chart data is loading. Shows skeleton overlay. */
    isLoading?: boolean;
    /** Optional threshold / mark lines overlaid on the chart. */
    thresholds?: ThresholdLine[];
    /** Optional coarse-state background regions (runtime/idle/offline bands). */
    stateRegions?: CoarseStateRegion[];
    /** Feature list — presentational hint only (used for future feature rendering). */
    features?: SafiChartFeature[];
    /** Show range selector buttons (5m, 10m, 1h, 2h, 3h). Defaults to true. */
    showRangeSelector?: boolean;
    /** Show the export/download button. Defaults to true. */
    showExporting?: boolean;
    /** Show legend below the chart. */
    showLegend?: boolean;
    /** IANA timezone string for x-axis label formatting. */
    timezone?: string;
    /** Additional CSS class names. */
    className?: string;
};
/**
 * SafiChart — The main time-series chart component used throughout the app.
 *
 * Mirrors the Vue `SafiChart.tsx` which wraps Highcharts with a feature-plugin
 * architecture. This React version uses ECharts (via `HChart`) as the rendering
 * engine and accepts presentational props for:
 *
 * - **Load curve** — one or more time-series lines
 * - **Threshold lines** — horizontal mark lines for online/offline thresholds
 * - **State regions** — colored background bands for coarse state (runtime/idle/offline/planned)
 * - **Range selector** — zoom presets (5m, 10m, 1h, 2h, 3h)
 *
 * Used in the Sidekick page, Monitor page detail, and anywhere a device's
 * power/metric chart is rendered.
 */
declare function SafiChart({ series, from, to, deviceName, metricUnit, height, isLoading, thresholds, stateRegions, showRangeSelector, showExporting: _showExporting, showLegend, timezone: _timezone, className, }: SafiChartProps): import("react/jsx-runtime").JSX.Element;
export { SafiChart };
//# sourceMappingURL=SafiChart.d.ts.map