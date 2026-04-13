import type React from "react";
import type { OEETargetStatus } from "../monitor-card/MonitorCard";
import type { ToggleExpandEvent } from "./MonitorTileBase";
type OEEMetricId = "availability" | "performance" | "quality";
interface OEEMetricLabels {
    availability: string;
    performance: string;
    quality: string;
}
interface MonitorOEECardProps {
    /** Device name shown as card title. */
    title: string;
    /** Card-level OEE target status for border ring. */
    status?: OEETargetStatus;
    /** Click handler for the title (navigates to production details). */
    onTitleClick?: () => void;
    /** OEE primary value (0-100). */
    oeeValue?: number;
    /** OEE target status for the primary tile background. */
    oeeStatus?: OEETargetStatus;
    /** OEE placeholder text. */
    oeePlaceholder?: string;
    /** Availability value (0-100). */
    availability?: number;
    /** Performance value (0-100). */
    performance?: number;
    /** Quality value (0-100). */
    quality?: number;
    /** Placeholder for A/P/Q tiles when still calculating. */
    metricPlaceholder?: string;
    /** Custom labels for A/P/Q metrics. */
    metricLabels?: OEEMetricLabels;
    /** Which metric is most off-target (gets emphasized styling). */
    mostOffTargetMetric?: OEEMetricId;
    /** Whether availability tile is expandable. */
    availabilityExpandable?: boolean;
    /** Whether performance tile is expandable. */
    performanceExpandable?: boolean;
    /** Whether quality tile is expandable. */
    qualityExpandable?: boolean;
    /** Footer content for availability. */
    availabilityFooter?: React.ReactNode;
    /** Footer content for performance. */
    performanceFooter?: React.ReactNode;
    /** Footer content for quality. */
    qualityFooter?: React.ReactNode;
    /** Expanded content for availability. */
    availabilityExpandedContent?: React.ReactNode;
    /** Expanded content for performance. */
    performanceExpandedContent?: React.ReactNode;
    /** Expanded content for quality. */
    qualityExpandedContent?: React.ReactNode;
    /** Tooltip content for the OEE primary tile. */
    oeeTooltip?: React.ReactNode;
    /** Time chart area content (columns 2-3 of the grid). */
    timeChartSlot?: React.ReactNode;
    /** Callback when a metric tile is expanded/collapsed. */
    onToggleExpand?: (event: ToggleExpandEvent) => void;
    className?: string;
}
/**
 * OEE card mirroring `MonitorOEECard.vue`.
 *
 * Layout:
 * - 3-column CSS grid (`grid grid-cols-3 gap-2 px-3 pb-3`)
 * - Column 1: OEE primary tile with status-based background
 * - Columns 2-3: Time segment chart area
 * - Row 2 (col-span-3): Three metric tiles (A/P/Q) in 12-column grid
 * - Expandable tiles that show detail content when clicked
 */
declare function MonitorOEECard({ title, status, onTitleClick, oeeValue, oeeStatus, oeePlaceholder, availability, performance, quality, metricPlaceholder, metricLabels, mostOffTargetMetric, availabilityExpandable, performanceExpandable, qualityExpandable, availabilityFooter, performanceFooter, qualityFooter, availabilityExpandedContent, performanceExpandedContent, qualityExpandedContent, oeeTooltip, timeChartSlot, onToggleExpand, className, ...props }: MonitorOEECardProps & Omit<React.ComponentProps<"div">, "onClick" | "title">): import("react/jsx-runtime").JSX.Element;
export { MonitorOEECard };
export type { MonitorOEECardProps, OEEMetricLabels };
//# sourceMappingURL=MonitorOEECard.d.ts.map