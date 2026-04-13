type OEETimeBlock = {
    id: string;
    status: "on-target" | "at-risk" | "off-target" | "partial" | "empty" | "future";
    tooltip?: {
        oee: number;
        availability: number;
        performance: number;
        quality: number;
        timeRange: string;
    };
};
type MonitorOEETimeChartProps = {
    blocks: OEETimeBlock[];
    title?: string;
    titleHighlighted?: boolean;
    showTimeLegend?: boolean;
    showProductChangeIndicator?: boolean;
    className?: string;
};
/**
 * Renders OEE-by-hour data as a row of colored time-segment "pills",
 * matching the Vue MonitorOEETimeChart / TimeSegmentChart components.
 *
 * Each segment is colored by its target status: on-target (green),
 * at-risk (yellow), off-target (red), partial (grey), empty (white),
 * future (dashed border).
 */
declare function MonitorOEETimeChart({ blocks, title, titleHighlighted, showTimeLegend, showProductChangeIndicator, className, }: MonitorOEETimeChartProps): import("react/jsx-runtime").JSX.Element;
export { MonitorOEETimeChart };
export type { MonitorOEETimeChartProps, OEETimeBlock };
//# sourceMappingURL=MonitorOEETimeChart.d.ts.map