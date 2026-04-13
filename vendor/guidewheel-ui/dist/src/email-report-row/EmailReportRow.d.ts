type EmailReportRowProps = {
    reportName: string;
    frequency: "daily" | "weekly";
    enabled: boolean;
    recipients?: string[];
    onToggle?: (enabled: boolean) => void;
    className?: string;
};
/**
 * A compact row for configuring email reports. Displays the report name with
 * a frequency badge, recipient count, and a switch toggle.
 */
declare function EmailReportRow({ reportName, frequency, enabled, recipients, onToggle, className, }: EmailReportRowProps): import("react/jsx-runtime").JSX.Element;
export { EmailReportRow };
export type { EmailReportRowProps };
//# sourceMappingURL=EmailReportRow.d.ts.map