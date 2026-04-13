type DatePickerProps = {
    selected?: Date;
    onSelect?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};
/**
 * A date picker that composes Popover, Button, and react-day-picker v9.
 *
 * Opens a calendar popover when the trigger button is clicked.
 */
declare function DatePicker({ selected, onSelect, placeholder, disabled, className, }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
export { DatePicker };
export type { DatePickerProps };
//# sourceMappingURL=DatePicker.d.ts.map