type AlertRuleRowProps = {
    name: string;
    deviceNames: string[];
    disabledDeviceNames?: string[];
    conditionType: "threshold" | "anomaly" | "lineAlert" | "stateSense";
    conditions: Array<{
        metric: string;
        operator: "gt" | "lt" | "eq";
        value: number;
        unit?: string;
        duration?: number;
    }>;
    recipients?: string[];
    message?: string;
    enabled: boolean;
    onToggle?: (enabled: boolean) => void;
    onEdit?: () => void;
    className?: string;
};
/**
 * A horizontal table row displaying an alert rule with full column set
 * matching the Vue AlertsTable.
 *
 * Columns: Devices | Conditions | Recipients | Message | Duration | Edit | Toggle
 */
declare function AlertRuleRow({ name, deviceNames, disabledDeviceNames, conditionType, conditions, recipients, message, enabled, onToggle, onEdit, className, }: AlertRuleRowProps): import("react/jsx-runtime").JSX.Element;
export { AlertRuleRow };
export type { AlertRuleRowProps };
//# sourceMappingURL=AlertRuleRow.d.ts.map