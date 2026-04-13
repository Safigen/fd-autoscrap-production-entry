import * as React from "react";
type FilterBarProps = {
    children: React.ReactNode;
    /** Number of currently active (non-default) filters. */
    activeFilterCount?: number;
    /** Called when the user clicks "Clear filters". */
    onClearAll?: () => void;
    /** Called when the user clicks the refresh/sync button. */
    onRefresh?: () => void;
    /** Whether to show a loading indicator. */
    loading?: boolean;
    /** Whether to show the refresh button. Defaults to true. */
    showRefresh?: boolean;
    /** Whether to show the toggle-filters button (mobile expand). Defaults to true. */
    showFilterToggle?: boolean;
    className?: string;
};
/**
 * Horizontal filter bar matching the Vue V2 FiltersV2 layout.
 *
 * Two-column layout:
 * - Left section (`FilterBarFilters`): filter trigger buttons, search, etc.
 * - Right section (`FilterBarActions`): clear, refresh, toggle buttons.
 *
 * The actions toolbar (clear / refresh / toggle) is rendered inline on the
 * right side, matching the Vue `c-issue-filters__actions` layout.
 */
declare function FilterBar({ children, activeFilterCount, onClearAll, onRefresh, loading, showRefresh, showFilterToggle, className, }: FilterBarProps): import("react/jsx-runtime").JSX.Element;
type FilterBarContextValue = {
    expanded: boolean;
};
declare function useFilterBarContext(): FilterBarContextValue;
type FilterBarFiltersProps = {
    children: React.ReactNode;
    className?: string;
};
/**
 * Left-aligned filter controls section matching Vue's `c-issue-filters__items`.
 *
 * Contains filter triggers, search, download, etc.
 */
declare function FilterBarFilters({ children, className }: FilterBarFiltersProps): import("react/jsx-runtime").JSX.Element;
type FilterBarSectionProps = {
    children: React.ReactNode;
    className?: string;
};
/**
 * Groups filter controls within a FilterBar.
 */
declare function FilterBarSection({ children, className }: FilterBarSectionProps): import("react/jsx-runtime").JSX.Element;
type FilterBarActionsProps = {
    children: React.ReactNode;
    className?: string;
};
/**
 * Right-aligned actions (download, search, etc.) matching Vue's
 * `c-issue-filters__actions` section.
 */
declare function FilterBarActions({ children, className }: FilterBarActionsProps): import("react/jsx-runtime").JSX.Element;
type FilterBarChipsProps = {
    children: React.ReactNode;
    className?: string;
};
/**
 * Row of active-filter chips with remove capability, rendered below the main
 * filter controls.
 */
declare function FilterBarChips({ children, className }: FilterBarChipsProps): import("react/jsx-runtime").JSX.Element;
export { FilterBar, FilterBarFilters, FilterBarSection, FilterBarActions, FilterBarChips, useFilterBarContext, };
export type { FilterBarProps, FilterBarFiltersProps, FilterBarSectionProps, FilterBarActionsProps, FilterBarChipsProps, };
//# sourceMappingURL=FilterBar.d.ts.map