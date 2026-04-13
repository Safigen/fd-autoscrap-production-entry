declare const STATUS_CONFIG: {
    readonly open: {
        readonly color: "#ff7961";
        readonly label: "Open";
        readonly icon: "issues-icon";
    };
    readonly acknowledged: {
        readonly color: "#F2994A";
        readonly label: "Acknowledged";
        readonly icon: "seen";
    };
    readonly closed: {
        readonly color: "#27AE60";
        readonly label: "Closed";
        readonly icon: "done-circle";
    };
};
type IssueStatus = keyof typeof STATUS_CONFIG;
type TagItem = {
    name: string;
    color?: string;
    isDeleted?: boolean;
    /** If set to "StateSense", a sparkles icon is shown instead of dot */
    taggedBy?: string;
};
type IssueCardProps = {
    /** Issue status — drives the status icon color */
    status: IssueStatus;
    /** Formatted date string, e.g. "20 Mar 02:30 PM" */
    startedAt: string;
    /** Device or line name */
    deviceName?: string;
    /** Message / action text */
    message?: string;
    /** First-fault device nicknames (line alerts) */
    firstFaultDevices?: string;
    /** Tags on this issue */
    tags?: TagItem[];
    /** Duration in minutes, or null for ongoing issues */
    duration: number | null;
    /** Whether this row is expandable (adds data attribute) */
    expandable?: boolean;
    /** Whether this row is currently expanded */
    expanded?: boolean;
    /** Called when user clicks edit button */
    onEdit?: () => void;
    /** Called when the row is clicked to expand/collapse */
    onClick?: () => void;
    /** Whether to show the edit button (permissions-driven) */
    showEdit?: boolean;
    /** Marks the row for overlapping issues */
    overlapping?: boolean;
    className?: string;
};
/**
 * A horizontal issue card that mirrors the issues-table row pattern
 * from the Vue `issuesTable.vue`.
 *
 * Displays: status icon, started date, device name, message/action,
 * tags (first tag + overflow count), and duration (minutes or "Ongoing"
 * badge with yellow background).
 */
declare function IssueCard({ status, startedAt, deviceName, message, firstFaultDevices, tags, duration, expandable, expanded, onEdit, onClick, showEdit, overlapping, className, }: IssueCardProps): import("react/jsx-runtime").JSX.Element;
export { IssueCard };
export type { IssueCardProps, TagItem as IssueTagItem };
//# sourceMappingURL=IssueCard.d.ts.map