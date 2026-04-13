type TrendChartSeries = {
    name: string;
    data: Array<{
        timestamp: number;
        value: number;
    }>;
    color?: string;
};
type TrendChartProps = {
    series: TrendChartSeries[];
    height?: number;
    showLegend?: boolean;
    className?: string;
};
/**
 * A time-series trend chart built on HChart (ECharts). Supports multiple
 * series with line/area rendering, a time-based x-axis, and an optional legend.
 */
declare function TrendChart({ series, height, showLegend, className, }: TrendChartProps): import("react/jsx-runtime").JSX.Element;
export { TrendChart };
export type { TrendChartProps, TrendChartSeries };
//# sourceMappingURL=TrendChart.d.ts.map