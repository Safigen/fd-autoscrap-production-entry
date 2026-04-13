export declare const ISSUE_STATUSES: {
    readonly open: "open";
    readonly inProgress: "in_progress";
    readonly resolved: "resolved";
    readonly closed: "closed";
};
export type IssueStatus = (typeof ISSUE_STATUSES)[keyof typeof ISSUE_STATUSES];
export type IssueTag = {
    id: string;
    name: string;
    color: string;
};
export type Issue = {
    id: string;
    title: string;
    description?: string;
    status: IssueStatus;
    tags: IssueTag[];
    assigneeId?: string;
    deviceId?: string;
    createdAt: number;
    updatedAt: number;
};
//# sourceMappingURL=issue.d.ts.map