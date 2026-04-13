import type React from "react";
declare const cardListVariants: (props?: ({
    columns?: 1 | 2 | 3 | 4 | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface CardListOwnProps {
    /** Number of responsive grid columns. */
    columns?: 1 | 2 | 3 | 4;
    /** Show loading skeleton placeholders. */
    isLoading?: boolean;
    /** Number of skeleton cards to show when loading. */
    loadingCount?: number;
    /** Show the empty state instead of children. */
    isEmpty?: boolean;
    /** Title for the empty state. */
    emptyMessage?: string;
    /** Description for the empty state. */
    emptyDescription?: string;
}
type CardListProps = Omit<React.ComponentProps<"div">, "columns"> & CardListOwnProps;
/**
 * A responsive grid layout for cards with built-in loading and empty states.
 *
 * Renders children in a CSS grid. When `isLoading` is true, displays
 * skeleton placeholders. When `isEmpty` is true, displays an EmptyState.
 */
declare function CardList({ className, children, columns, isLoading, loadingCount, isEmpty, emptyMessage, emptyDescription, ...props }: CardListProps): import("react/jsx-runtime").JSX.Element;
export { CardList, cardListVariants };
export type { CardListProps };
//# sourceMappingURL=CardList.d.ts.map