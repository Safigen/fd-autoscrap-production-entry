import type { ExternalToast } from 'sonner';
/**
 * Creates toast functions scoped to a specific toaster.
 *
 * Use this to ensure toasts appear in the correct `<Toaster>` when multiple
 * toasters exist in the app (e.g., across different React feature trees).
 *
 * @example
 * ```tsx
 * // In your component
 * toastFor(PLANTS_TOASTER_ID).success('Configuration saved');
 * toastFor(PLANTS_TOASTER_ID).error('Failed to save schedule');
 * ```
 */
export declare const toastFor: (toasterId: string) => {
    /**
     * Show a success toast in the specified toaster.
     */
    success: (message: string, options?: ExternalToast) => string | number;
    /**
     * Show an error toast in the specified toaster.
     */
    error: (message: string, options?: ExternalToast) => string | number;
};
//# sourceMappingURL=toastFor.d.ts.map