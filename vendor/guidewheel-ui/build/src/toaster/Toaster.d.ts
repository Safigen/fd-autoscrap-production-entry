import { type ToasterProps as SonnerToasterProps } from 'sonner';
export type ToasterProps = Omit<SonnerToasterProps, 'id'> & {
    /**
     * `id` is required by our Toaster to disambiguate between multiple toasters in
     * the same page.
     */
    id: string;
};
/**
 * A container component for showing toast notifications, built on top of the `sonner` library.
 *
 * This module provides both a component (`Toaster`) and a function (`toastFor`)
 * to show notifications in Toasters.
 *
 * ## How to toast
 *
 * To toast, establish a `Toaster` and then use `toastFor` to show notifications.
 *
 * In a Root-level or feature-level component:
 * ```tsx
 * <Toaster id={PLANTS_TOASTER_ID} />
 * ```
 *
 * Then in any component rendered in the same feature tree (page):
 *
 * ```tsx
 * <Button onClick={() => toastFor(PLANTS_TOASTER_ID).success('Changes saved successfully')}>
 *   Show Success Toast
 * </Button>
 *  <Button onClick={() => toastFor(PLANTS_TOASTER_ID).error('There was an error saving changes')}>
 *   Show Error Toast
 * </Button>
 * ```
 */
declare const Toaster: ({ ...props }: ToasterProps) => import("react/jsx-runtime").JSX.Element;
export { Toaster };
//# sourceMappingURL=Toaster.d.ts.map