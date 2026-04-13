type NotificationBarProps = {
    message: string;
    variant?: "info" | "success" | "warning" | "danger";
    action?: {
        label: string;
        onClick: () => void;
    };
    onDismiss?: () => void;
    className?: string;
};
/**
 * A full-width sticky notification bar pinned to the top of the viewport.
 * Composes Banner with an optional action button and dismiss behavior.
 */
declare function NotificationBar({ message, variant, action, onDismiss, className, }: NotificationBarProps): import("react/jsx-runtime").JSX.Element;
export { NotificationBar };
export type { NotificationBarProps };
//# sourceMappingURL=NotificationBar.d.ts.map