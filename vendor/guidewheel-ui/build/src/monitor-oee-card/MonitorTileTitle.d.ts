type MonitorTileTitleVariant = "default" | "muted";
interface MonitorTileTitleProps {
    /** Title text. */
    title: string;
    /** Visual style — 'default' for normal, 'muted' for secondary. */
    variant?: MonitorTileTitleVariant;
}
/**
 * Simple title component for monitor tiles mirroring `MonitorTileTitle.vue`.
 */
declare function MonitorTileTitle({ title, variant, }: MonitorTileTitleProps): import("react/jsx-runtime").JSX.Element;
export { MonitorTileTitle };
export type { MonitorTileTitleProps, MonitorTileTitleVariant };
//# sourceMappingURL=MonitorTileTitle.d.ts.map