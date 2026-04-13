import type React from "react";
declare const metricCardBorderVariants: (props?: ({
    state?: "runtime" | "idle" | "offline" | "planned" | "nodata" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface MetricCardOwnProps {
    /** Card title displayed in the header. */
    title: string;
    /** Optional subtitle displayed below the title. */
    subtitle?: string;
    /** Load state controlling the left border color and status dot. */
    state?: "runtime" | "idle" | "offline" | "planned" | "nodata";
    /** Array of metrics to display in a grid of MetricTile components. */
    metrics?: Array<{
        label: string;
        value?: string | number;
        unit?: string;
    }>;
    /** Click handler. When provided, the card gets hover effects. */
    onClick?: () => void;
    /** Additional content rendered below the metrics grid. */
    children?: React.ReactNode;
}
type MetricCardProps = Omit<React.ComponentProps<"div">, "onClick"> & MetricCardOwnProps;
/**
 * A card composing Card, MetricTile, and StatusIndicator to display
 * a device or entity with its current load state and key metrics.
 *
 * The left border is colored by load state, the header shows a title
 * with a status dot, and the body contains a responsive grid of metric tiles.
 */
declare function MetricCard({ className, title, subtitle, state, metrics, onClick, children, ...props }: MetricCardProps): import("react/jsx-runtime").JSX.Element;
export { MetricCard, metricCardBorderVariants };
export type { MetricCardProps };
//# sourceMappingURL=MetricCard.d.ts.map