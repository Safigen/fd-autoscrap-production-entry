type DownloadButtonProps = {
    /** Called when the user selects "CSV" from the dropdown. */
    onDownloadCsv?: () => void;
    /** Called when the user selects "Excel" from the dropdown. */
    onDownloadExcel?: () => void;
    /** Whether a download is currently in progress (shows spinner). */
    loading?: boolean;
    /** Tooltip text. */
    tooltip?: string;
    className?: string;
};
/**
 * A download icon button matching the Vue V2 Download.vue component.
 *
 * Renders as a 45px x 44px bordered icon button. Clicking opens a dropdown
 * menu with "CSV" and "Excel" options. When `loading` is true, a spinner
 * replaces the download icon.
 *
 * Vue reference:
 * - Width: 45px, Height: 44px
 * - White background, border brand-grey-400, border-radius 4px
 * - Dropdown with "Table data" header, CSV and Excel items
 */
declare function DownloadButton({ onDownloadCsv, onDownloadExcel, loading, tooltip, className, }: DownloadButtonProps): import("react/jsx-runtime").JSX.Element;
export { DownloadButton };
export type { DownloadButtonProps };
//# sourceMappingURL=DownloadButton.d.ts.map