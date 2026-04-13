import type React from "react";
type AppBarProps = {
    title: string;
    subtitle?: string;
    breadcrumbs?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
};
/**
 * Page header bar mirroring ViewWrapper.vue.
 *
 * Layout (from the Vue source):
 * - Outer card: bg #f9fbfd, padding 1rem (mobile) / 1rem 1.5rem 4rem (desktop)
 * - Header row: flex justify-between align-center
 *   - Left: <strong> title (inline) + <span> byLine (ml-3, blue-grey, font-weight-light)
 *   - Right: action buttons (e.g. "New Issue")
 * - Divider (v-divider class="mt-3") below header
 * - Content slot below divider
 */
declare function AppBar({ title, subtitle, breadcrumbs, actions, className, children, }: AppBarProps): import("react/jsx-runtime").JSX.Element;
export { AppBar };
export type { AppBarProps };
//# sourceMappingURL=AppBar.d.ts.map