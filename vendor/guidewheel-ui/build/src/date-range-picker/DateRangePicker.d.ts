type DateRange = {
    from?: Date;
    to?: Date;
};
type DateRangePickerProps = {
    range?: DateRange;
    onRangeChange?: (range: DateRange | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};
/**
 * A date range picker that composes Popover, Button, and react-day-picker v9
 * with side-by-side dual calendars for selecting a date range.
 */
declare function DateRangePicker({ range, onRangeChange, placeholder, disabled, className, }: DateRangePickerProps): import("react/jsx-runtime").JSX.Element;
export { DateRangePicker };
export type { DateRange, DateRangePickerProps };
//# sourceMappingURL=DateRangePicker.d.ts.map