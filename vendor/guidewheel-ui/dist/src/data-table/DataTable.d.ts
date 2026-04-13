import type React from 'react';
type Column<T> = {
    id: string;
    header: string;
    accessor: (row: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
};
type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    onSort?: (columnId: string) => void;
    isLoading?: boolean;
    loadingRows?: number;
    emptyMessage?: string;
    emptyDescription?: string;
    className?: string;
};
/**
 * A sortable data table composing Table, Skeleton, and EmptyState.
 *
 * Accepts typed column definitions with accessor functions for extracting
 * cell content. Supports controlled sorting, loading skeleton rows,
 * and an empty state when no data is available.
 */
declare function DataTable<T>({ columns, data, sortBy, sortDirection, onSort, isLoading, loadingRows, emptyMessage, emptyDescription, className, }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export { DataTable };
export type { Column, DataTableProps };
//# sourceMappingURL=DataTable.d.ts.map