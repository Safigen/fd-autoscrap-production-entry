type IssueDetailsPanelProps = {
    title: string;
    status: "open" | "acknowledged" | "closed";
    onStatusChange?: (status: string) => void;
    assignees?: Array<{
        id: string;
        name: string;
        avatarUrl?: string;
    }>;
    onAssigneesChange?: (ids: string[]) => void;
    tags?: Array<{
        name: string;
        color: string;
    }>;
    onTagsChange?: (tags: Array<{
        name: string;
        color: string;
    }>) => void;
    threshold?: {
        metric: string;
        value: number;
        operator: string;
        duration?: number;
    };
    timeToAcknowledge?: string;
    alertType?: string;
    deviceName?: string;
    startTime?: string;
    endTime?: string;
    graphSlot?: React.ReactNode;
    comments?: Array<{
        id: string;
        author: string;
        content: string;
        timestamp: string;
        avatarUrl?: string;
    }>;
    onAddComment?: (content: string) => void;
    onEditAlert?: () => void;
    className?: string;
};
/**
 * Issue details panel matching the Vue IssueDetails layout.
 *
 * Top: title + status dropdown + edit button
 * Middle: assignees, tags, details (threshold/TTA/alert type) with "more" toggle
 * Chart area: graphSlot
 * Bottom: activity / comments
 */
declare function IssueDetailsPanel({ title, status, onStatusChange, assignees, onAssigneesChange, tags, onTagsChange, threshold, timeToAcknowledge, alertType, deviceName, startTime, endTime, graphSlot, comments, onAddComment, onEditAlert, className, }: IssueDetailsPanelProps): import("react/jsx-runtime").JSX.Element;
export { IssueDetailsPanel };
export type { IssueDetailsPanelProps };
//# sourceMappingURL=IssueDetailsPanel.d.ts.map