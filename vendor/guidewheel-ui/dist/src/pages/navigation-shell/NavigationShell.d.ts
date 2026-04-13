import type React from "react";
import { type NavItem } from "../../navigation-sidebar/NavigationSidebar";
/**
 * Default nav items matching the Vue NavigationLayout sidebar order.
 * See .reference/src/config/routes.js for the canonical order.
 */
declare const DEFAULT_NAV_ITEMS: NavItem[];
type NavigationShellProps = {
    /** Custom nav items. Falls back to default app nav when omitted. */
    navItems?: NavItem[];
    /** Which nav item is active (matched by id). */
    activeId?: string;
    /** Page title shown in the AppBar. */
    pageTitle: string;
    /** Optional subtitle shown below the page title. */
    pageSubtitle?: string;
    /** Breadcrumb content for the AppBar. */
    breadcrumbs?: React.ReactNode;
    /** Action buttons for the AppBar. */
    actions?: React.ReactNode;
    /** Whether to show the global "New Issue" button in the header. Defaults to true. */
    showNewIssue?: boolean;
    /** Whether the sidebar starts collapsed. */
    defaultCollapsed?: boolean;
    /** Page content. */
    children: React.ReactNode;
    className?: string;
};
/**
 * App shell mirroring NavigationLayout.vue.
 *
 * Layout: `flex h-screen` with NavigationSidebar on the left and a flex-col
 * content area on the right containing an AppBar at the top and a scrollable
 * main content area below.
 *
 * Storybook-only composition -- not exported from the package.
 */
declare function NavigationShell({ navItems, activeId, pageTitle, pageSubtitle, breadcrumbs, actions, showNewIssue, defaultCollapsed, children, className, }: NavigationShellProps): import("react/jsx-runtime").JSX.Element;
export { NavigationShell, DEFAULT_NAV_ITEMS };
export type { NavigationShellProps };
//# sourceMappingURL=NavigationShell.d.ts.map