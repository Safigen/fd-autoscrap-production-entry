import type React from 'react';
/**
 * A composable empty state container for when no data is available.
 */
declare function EmptyState({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
/**
 * Icon container for EmptyState. Expects an icon component as children.
 */
declare function EmptyStateIcon({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
/**
 * Title for EmptyState.
 */
declare function EmptyStateTitle({ className, ...props }: React.ComponentProps<'h3'>): import("react/jsx-runtime").JSX.Element;
/**
 * Description text for EmptyState.
 */
declare function EmptyStateDescription({ className, ...props }: React.ComponentProps<'p'>): import("react/jsx-runtime").JSX.Element;
/**
 * Action container for EmptyState. Expects a Button or similar action as children.
 */
declare function EmptyStateAction({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
export { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription, EmptyStateAction, };
//# sourceMappingURL=EmptyState.d.ts.map