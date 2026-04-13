import type React from "react";
import type { GanttSegment } from "../types";
type StatRow = {
    /** Stat label, e.g. "Energy Intensity", "Total Production". */
    label: string;
    /** Value for the current period. */
    current: string;
    /** Value for the previous period. */
    previous?: string;
    /** Percentage change between periods. */
    change?: string;
};
type ProductionPeriodCardProps = {
    /** Shift name shown in the header (e.g. "Day Shift"). */
    shiftName: string;
    /** Optional SKU / product name. */
    skuName?: string;
    /** Shift start time string (e.g. "06:00"). */
    startTime: string;
    /** Shift end time string (e.g. "14:00"). */
    endTime: string;
    /** Good count produced during the period. */
    goodCount: number;
    /** Reject / scrap count during the period. */
    rejectCount: number;
    /** Optional target count for completion calculation. */
    targetCount?: number;
    /**
     * Stats rows displayed in a comparison table below the chart area.
     * Mirrors the Vue v-data-table with Stat / Current / Previous / Change columns.
     */
    stats?: StatRow[];
    /** Load state Gantt timeline segments for the bottom timeline bar. */
    ganttData?: GanttSegment[];
    /** Placeholder for chart content (e.g. a Highcharts or ECharts column chart). */
    chart?: React.ReactNode;
    /** Show "No data" message instead of chart + stats. */
    noData?: boolean;
    className?: string;
};
/**
 * A production period card matching the Vue Production.vue component layout.
 *
 * Structure:
 * - Header: shift name (left) + time range (right), optional SKU name
 * - Chart area: renders `chart` prop, or a placeholder column-chart region
 * - Stats table: comparison rows with Stat / Current / Previous / Change columns
 * - Metrics row: Good, Reject, and Target/Total counts
 * - Optional Gantt timeline at the bottom
 */
declare function ProductionPeriodCard({ shiftName, skuName, startTime, endTime, goodCount, rejectCount, targetCount, stats, ganttData, chart, noData, className, }: ProductionPeriodCardProps): import("react/jsx-runtime").JSX.Element;
export { ProductionPeriodCard };
export type { ProductionPeriodCardProps, StatRow };
//# sourceMappingURL=ProductionPeriodCard.d.ts.map