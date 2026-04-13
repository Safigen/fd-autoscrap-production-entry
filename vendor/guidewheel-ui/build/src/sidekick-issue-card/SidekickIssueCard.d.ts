declare const STATUS_CONFIG: {
    readonly open: {
        readonly color: "#ff7961";
        readonly label: "Open";
    };
    readonly acknowledged: {
        readonly color: "#F2994A";
        readonly label: "Acknowledged";
    };
    readonly closed: {
        readonly color: "#27AE60";
        readonly label: "Closed";
    };
};
type IssueStatus = keyof typeof STATUS_CONFIG;
type TagItem = {
    /** Display name */
    name: string;
    /** CSS colour for the dot indicator */
    color?: string;
    /** Deleted tags render muted */
    isDeleted?: boolean;
};
type SidekickIssueCardProps = {
    /** Issue status — drives border / bg color when active */
    status: IssueStatus;
    /** Formatted start time, e.g. "02:30 PM" */
    startTime: string;
    /** Formatted stop time or "Ongoing" */
    stopTime: string;
    /** Optional timezone abbreviation shown after the time range */
    timezone?: string;
    /** Tags attached to the issue (max 2 shown, overflow counted) */
    tags?: TagItem[];
    /** Called when "Tag" button is pressed */
    onTagClick?: () => void;
    /** Called when "Info" button is pressed */
    onInfoClick?: () => void;
    /** Disables action buttons (e.g. insufficient permissions) */
    disabled?: boolean;
    className?: string;
};
/**
 * HMI-style issue card for the Sidekick operator interface.
 *
 * Fixed 240x194 px card (156 px on small viewports) mirroring the Vue
 * `IssueCard.vue` in OperatorTagging exactly: status indicator in the
 * top-right corner, large time-range text, 2-column tag grid with
 * overflow count, "No tag added" danger state, and split action buttons.
 */
declare function SidekickIssueCard({ status, startTime, stopTime, timezone, tags, onTagClick, onInfoClick, disabled, className, }: SidekickIssueCardProps): import("react/jsx-runtime").JSX.Element;
export { SidekickIssueCard };
export type { SidekickIssueCardProps, TagItem as SidekickTagItem };
//# sourceMappingURL=SidekickIssueCard.d.ts.map