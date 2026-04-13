import * as React from "react";
type NavItem = {
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    active?: boolean;
};
type NavigationSidebarProps = {
    /** Navigation items shown in the main area. */
    items: NavItem[];
    /** Whether the sidebar is collapsed to icon-only mode. */
    collapsed?: boolean;
    /** Callback fired when the sidebar collapse state should toggle. */
    onToggleCollapse?: () => void;
    /** Callback fired when a nav item is clicked. */
    onItemClick?: (item: NavItem) => void;
    /** Override the default logo element. */
    logo?: React.ReactNode;
    /** Company name displayed below the logo. */
    companyName?: string;
    /** Username displayed in the user menu area. */
    username?: string;
    /** Callback fired when the user clicks logout. */
    onLogout?: () => void;
    /** Help center URL. Defaults to `https://support.guidewheel.app`. */
    helpCenterUrl?: string;
    /** Collapse icon (shown when expanded). */
    collapseIcon?: React.ReactNode;
    /** Expand icon (shown when collapsed). */
    expandIcon?: React.ReactNode;
    /** Help icon for the help center link. */
    helpIcon?: React.ReactNode;
    /** User icon for the user menu area. */
    userIcon?: React.ReactNode;
    /** Additional CSS class name for the root element. */
    className?: string;
};
/**
 * A collapsible sidebar navigation matching the Vue NavigationLayout.vue.
 *
 * Features:
 * - Edge-strip toggle on the right side of the sidebar
 * - Collapse/Expand nav item at the bottom
 * - Help Center link
 * - User menu with logout
 * - Company name below the logo
 *
 * Width: 150px expanded, 56px collapsed (matching Vue mini-variant).
 */
declare function NavigationSidebar({ items, collapsed, onToggleCollapse, onItemClick, logo, companyName, username, onLogout, helpCenterUrl, collapseIcon, expandIcon, helpIcon, userIcon, className, }: NavigationSidebarProps): import("react/jsx-runtime").JSX.Element;
export { NavigationSidebar };
export type { NavItem, NavigationSidebarProps };
//# sourceMappingURL=NavigationSidebar.d.ts.map