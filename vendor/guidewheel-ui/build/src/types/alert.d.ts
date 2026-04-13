export type AlertRule = {
    id: string;
    name: string;
    deviceId: string;
    metric: string;
    threshold: number;
    operator: 'gt' | 'lt' | 'eq';
    enabled: boolean;
    recipients: string[];
};
//# sourceMappingURL=alert.d.ts.map