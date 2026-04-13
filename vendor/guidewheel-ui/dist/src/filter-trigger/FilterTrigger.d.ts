import * as React from "react";
type FilterTriggerProps = {
    /** The prefix label displayed before the value (e.g. "Devices", "Status"). */
    label: string;
    /** The current value to display after the label (e.g. "CNC Mill #1", "All"). */
    value?: string;
    /** Whether the filter has a non-default value, applying the active/dirty style. */
    isDirty?: boolean;
    /** Optional leading icon rendered before the label. */
    icon?: React.ReactNode;
    /** Click handler for the trigger button. */
    onClick?: () => void;
    /** Whether the trigger is disabled. */
    disabled?: boolean;
    className?: string;
};
/**
 * A filter trigger button matching the Vue V2 FilterV2 pattern.
 *
 * Displays `"Label: Value"` with a dropdown chevron. When `isDirty` is true
 * the button switches to the active/dirty style (primary-100 background,
 * primary-500 border) indicating a non-default filter value is applied.
 *
 * Height is fixed at 44px to match the Vue implementation.
 */
declare function FilterTrigger({ label, value, isDirty, icon, onClick, disabled, className, }: FilterTriggerProps): import("react/jsx-runtime").JSX.Element;
export { FilterTrigger };
export type { FilterTriggerProps };
//# sourceMappingURL=FilterTrigger.d.ts.map