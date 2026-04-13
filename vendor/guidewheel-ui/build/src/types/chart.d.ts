import type { LoadState } from './device';
export type GanttSegment = {
    start: number;
    end: number;
    state: LoadState;
    label?: string;
};
export type TimeSeriesPoint = {
    timestamp: number;
    value: number;
};
export type ChartSeries = {
    name: string;
    data: TimeSeriesPoint[];
    color?: string;
};
//# sourceMappingURL=chart.d.ts.map