import type { GanttSegment } from './types';
type GanttChartProps = {
    data: GanttSegment[];
    height?: number;
    showTooltip?: boolean;
    showXAxis?: boolean;
    className?: string;
};
/**
 * Specialized ECharts wrapper for Gantt / timeline charts showing load states.
 *
 * Each segment is rendered as a coloured rectangle based on the device load
 * state. Defaults to 24 px height with no axes for a compact Gantt bar.
 */
declare function GanttChart({ data, height, showTooltip, showXAxis, className, }: GanttChartProps): import("react/jsx-runtime").JSX.Element;
export { GanttChart };
export type { GanttChartProps };
//# sourceMappingURL=GanttChart.d.ts.map