import type React from 'react';
/**
 * Displays the path to the current resource using a hierarchy of links.
 */
declare function Breadcrumb({ ...props }: React.ComponentProps<'nav'>): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<'a'> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>): import("react/jsx-runtime").JSX.Element;
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, };
//# sourceMappingURL=Breadcrumb.d.ts.map