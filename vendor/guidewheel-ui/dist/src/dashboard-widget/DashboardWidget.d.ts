import type React from "react";
type DashboardWidgetProps = {
    /** Widget title displayed in the toolbar header. */
    title: string;
    /** Optional link path for when the toolbar header is clicked. */
    link?: string;
    /** Callback fired when the toolbar header is clicked. */
    onHeaderClick?: () => void;
    /** Shows a loading skeleton when true, hiding the content slot. */
    loading?: boolean;
    /** Actions rendered on the right side of the toolbar (buttons, menus). */
    actions?: React.ReactNode;
    /** Main content rendered below the header when not loading. */
    children?: React.ReactNode;
    className?: string;
};
/**
 * A dashboard widget card container matching the Vue HomeWidget pattern.
 *
 * Renders a v-card-style layout with:
 * - A dense toolbar header showing the title (left) and optional actions (right)
 * - A loading skeleton when `loading` is true
 * - A content slot for the widget body (chart, metrics, table, etc.)
 *
 * Used as the outer wrapper for TotalPower, Production, Issues, and Energy
 * widgets on the Summary / Home dashboard page.
 */
declare function DashboardWidget({ title, link, onHeaderClick, loading, actions, children, className, ...props }: DashboardWidgetProps & Omit<React.ComponentProps<"div">, "title">): import("react/jsx-runtime").JSX.Element;
export { DashboardWidget };
export type { DashboardWidgetProps };
//# sourceMappingURL=DashboardWidget.d.ts.map