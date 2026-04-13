type ExpandableSearchProps = {
    /** Current search value. */
    value?: string;
    /** Called when the input value changes. */
    onChange?: (value: string) => void;
    /** Placeholder text shown when expanded. */
    placeholder?: string;
    className?: string;
};
/**
 * A collapsible search input matching the Vue V2 Search filter pattern.
 *
 * Renders as a compact 45px-wide icon button by default. On focus (or click),
 * it expands to 300px revealing the text input. When blurred and empty, it
 * collapses back to the icon-only state.
 *
 * The expand/collapse transition uses `width 0.2s ease-in-out` matching the
 * Vue CSS transition.
 */
declare function ExpandableSearch({ value, onChange, placeholder, className, }: ExpandableSearchProps): import("react/jsx-runtime").JSX.Element;
export { ExpandableSearch };
export type { ExpandableSearchProps };
//# sourceMappingURL=ExpandableSearch.d.ts.map