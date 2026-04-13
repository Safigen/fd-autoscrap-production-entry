type PaginationProps = {
    /** Current active page (1-based). */
    currentPage: number;
    /** Total number of pages. */
    totalPages: number;
    /** Called with the new page number when the user navigates. */
    onPageChange: (page: number) => void;
    /**
     * Number of sibling pages shown on each side of the current page.
     * Defaults to 1 (e.g. 1 ... 4 [5] 6 ... 10).
     */
    siblingCount?: number;
    className?: string;
};
declare const ELLIPSIS: "ellipsis";
type PageItem = number | typeof ELLIPSIS;
/**
 * Builds a compact page range like Vuetify's v-pagination:
 *   [1] ... [4] [5] [6] ... [10]
 */
declare function getPageRange(currentPage: number, totalPages: number, siblingCount: number): PageItem[];
/**
 * Pagination controls matching Vuetify v-pagination visual style.
 *
 * Renders Previous/Next buttons flanking numbered page buttons
 * with ellipsis for large page counts.
 */
declare function Pagination({ currentPage, totalPages, onPageChange, siblingCount, className, }: PaginationProps): import("react/jsx-runtime").JSX.Element | null;
export { Pagination, getPageRange };
export type { PaginationProps };
//# sourceMappingURL=Pagination.d.ts.map