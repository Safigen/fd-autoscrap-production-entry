import * as React from "react";
type MenuItem = {
    id: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
};
type MenuGroup = {
    label?: string;
    items: MenuItem[];
};
type MenuProps = {
    trigger: React.ReactNode;
    groups: MenuGroup[];
    selected?: string | string[];
    onSelect?: (id: string) => void;
    multiple?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    className?: string;
};
/**
 * Enhanced dropdown with search, single/multi select, and subheaders.
 *
 * Wraps Popover for full control over content layout. Supports grouped
 * items, inline search filtering, and both single and multi-select modes.
 */
declare function Menu({ trigger, groups, selected, onSelect, multiple, searchable, searchPlaceholder, className, }: MenuProps): import("react/jsx-runtime").JSX.Element;
export { Menu };
export type { MenuItem, MenuGroup, MenuProps };
//# sourceMappingURL=Menu.d.ts.map