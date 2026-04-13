/**
 * OEE target status — mirrors the Vue `OEETargetStatus` type.
 */
type OEETargetStatus = "on-target" | "off-target" | "at-risk" | "none";
type MonitorCardProps = {
    /** Card title (e.g. device nickname). */
    title?: string;
    /** OEE target status — drives border ring colour. */
    status?: OEETargetStatus;
    /** Click handler for the title area. When provided the title renders as a
     *  `<button>` (navigable) instead of an `<h1>`. */
    onTitleClick?: () => void;
    /** Content rendered below the title inside the card body. */
    children?: React.ReactNode;
    className?: string;
};
/**
 * Reusable monitor card that mirrors `MonitorCard.vue`.
 *
 * Features:
 * - Blue CTA hover bar at top ("Open production details")
 * - Status-based border ring (off-target = red, at-risk = yellow, default = grey)
 * - Title as bold 24px text, rendered as `<button>` or `<h1>` depending on
 *   whether `onTitleClick` is provided
 * - Children slot for card content
 */
declare function MonitorCard({ title, status, onTitleClick, children, className, ...props }: MonitorCardProps & Omit<React.ComponentProps<"div">, "onClick">): import("react/jsx-runtime").JSX.Element;
export { MonitorCard };
export type { MonitorCardProps, OEETargetStatus };
//# sourceMappingURL=MonitorCard.d.ts.map