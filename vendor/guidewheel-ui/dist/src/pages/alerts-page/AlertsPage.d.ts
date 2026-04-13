type AlertsIssue = {
    id: string;
    status: "open" | "acknowledged" | "closed";
    startedAt: string;
    deviceName: string;
    message: string;
    tags: Array<{
        name: string;
        color?: string;
    }>;
    duration: number | null;
};
type AlertRule = {
    id: string;
    name: string;
    deviceName: string;
    metric: string;
    threshold: number;
    operator: "gt" | "lt" | "eq";
    enabled: boolean;
};
type AlertsPageProps = {
    /** Initial tab: issues | analysis | alertSettings */
    defaultTab?: string;
    /** Issues data */
    issues?: AlertsIssue[];
    /** Alert rules data */
    alertRules?: AlertRule[];
    /** Whether issues are loading */
    isLoading?: boolean;
    className?: string;
};
/**
 * Full-page Alerts/Issues composition mirroring the Vue Alerts/index.vue view.
 *
 * Three tabs: Issues (FilterBar + DataTable), Analysis (placeholder), and
 * Alert Settings (list of AlertRuleRows). Wrapped in NavigationShell with
 * the "Issues" nav item active.
 *
 * Filters mirror Vue: LiveMode, DateTimeRangePicker, Devices, Tags, Shift,
 * Status, Users, TagBy, TagPlanned, IssueType, Duration, Recipients.
 */
declare function AlertsPage({ defaultTab, issues, alertRules, isLoading, className, }: AlertsPageProps): import("react/jsx-runtime").JSX.Element;
export { AlertsPage };
export type { AlertsPageProps, AlertsIssue, AlertRule as AlertsAlertRule };
//# sourceMappingURL=AlertsPage.d.ts.map