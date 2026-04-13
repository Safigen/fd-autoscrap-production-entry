type SettingsField = {
    id: string;
    label: string;
    type: "text" | "number" | "select" | "switch" | "radio";
    value?: string | number | boolean;
    options?: Array<{
        label: string;
        value: string;
    }>;
    description?: string;
};
type SettingsSectionProps = {
    title: string;
    description?: string;
    fields: SettingsField[];
    onChange?: (fieldId: string, value: string | number | boolean) => void;
    className?: string;
};
/**
 * A settings form section that renders a Card with a title, optional description,
 * and a list of fields with appropriate form controls based on field type.
 */
declare function SettingsSection({ title, description, fields, onChange, className, }: SettingsSectionProps): import("react/jsx-runtime").JSX.Element;
export { SettingsSection };
export type { SettingsSectionProps, SettingsField };
//# sourceMappingURL=SettingsSection.d.ts.map