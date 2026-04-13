import * as echarts from 'echarts';
type HChartProps = {
    option: echarts.EChartsOption;
    height?: number | string;
    isLoading?: boolean;
    className?: string;
    onEvents?: Record<string, (params: any) => void>;
};
/**
 * Generic ECharts wrapper for line, area, column, bar, and pie charts.
 *
 * Registers the Guidewheel theme on first render and shows a Skeleton
 * overlay while `isLoading` is true.
 */
declare function HChart({ option, height, isLoading, className, onEvents, }: HChartProps): import("react/jsx-runtime").JSX.Element;
export { HChart };
export type { HChartProps };
//# sourceMappingURL=HChart.d.ts.map