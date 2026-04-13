type LiveModeButtonProps = {
    /** Whether live mode is currently enabled. */
    enabled?: boolean;
    /** Called when the button is toggled. */
    onToggle?: () => void;
    /** Whether to show the "Live View" label text. Hidden on mobile by default. */
    showLabel?: boolean;
    /** Whether to show the circular progress indicator around the icon. */
    showProgress?: boolean;
    /** Progress value from 0 to 100 for the circular indicator. */
    progress?: number;
    className?: string;
};
/**
 * A live mode toggle button matching the Vue V2 LiveMode component.
 *
 * Displays a pulsing dot icon (red when inactive, green with pulse animation
 * when active). When enabled, the button switches to the active style with
 * primary-100 background and primary-500 border.
 *
 * Optionally renders a circular progress SVG around the icon to indicate
 * the refresh interval.
 */
declare function LiveModeButton({ enabled, onToggle, showLabel, showProgress, progress, className, }: LiveModeButtonProps): import("react/jsx-runtime").JSX.Element;
export { LiveModeButton };
export type { LiveModeButtonProps };
//# sourceMappingURL=LiveModeButton.d.ts.map