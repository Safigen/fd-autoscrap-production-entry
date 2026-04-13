type OEETargetStatus = "on-target" | "off-target" | "at-risk" | "none";
interface MonitorDevice {
    id: string;
    name: string;
    oeeValue?: number;
    oeeStatus: OEETargetStatus;
    status: OEETargetStatus;
    availability?: number;
    performance?: number;
    quality?: number;
    mostOffTargetMetric?: "availability" | "performance" | "quality";
}
interface MonitorPageProps {
    /** Devices to display as OEE cards. */
    devices?: MonitorDevice[];
    /** Whether the page is in loading state. */
    isLoading?: boolean;
    /** Whether to show the empty state (no devices). */
    isEmpty?: boolean;
    /** Number of cards per page for pagination. 0 = show all. */
    cardsPerPage?: number;
    className?: string;
}
/**
 * Default mock devices for the Monitor page story.
 * Mirrors realistic OEE data with varied statuses.
 */
declare const DEFAULT_DEVICES: MonitorDevice[];
/**
 * Monitor page composition mirroring /views/Monitor/index.vue.
 *
 * Layout:
 * - NavigationShell with "Monitor" active
 * - FilterBar with search, shift selector, plant selector, OEE target filter,
 *   hide-unscheduled toggle, live mode
 * - No-results alert when filters exclude all devices
 * - Responsive card grid (md:2, lg:3, xl:4 columns) of MonitorOEECards
 * - Pagination when many cards
 * - Empty state when no devices
 * - Loading state with skeleton cards
 *
 * Storybook-only -- not exported from the package.
 */
declare function MonitorPage({ devices, isLoading, isEmpty, cardsPerPage, className, }: MonitorPageProps): import("react/jsx-runtime").JSX.Element;
export { MonitorPage, DEFAULT_DEVICES };
export type { MonitorPageProps, MonitorDevice };
//# sourceMappingURL=MonitorPage.d.ts.map