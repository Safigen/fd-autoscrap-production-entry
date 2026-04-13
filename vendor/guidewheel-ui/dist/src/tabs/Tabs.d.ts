import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
/**
 * Root container for a tabbed interface.
 */
declare function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * Container for tab triggers, rendered as a horizontal row with a bottom border.
 */
declare function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>): import("react/jsx-runtime").JSX.Element;
/**
 * A button that activates its associated tab panel.
 *
 * Styled with muted foreground when inactive and a primary bottom border when
 * active. Meets the 44px minimum touch-target requirement.
 */
declare function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * The content panel associated with a tab trigger.
 */
declare function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Tabs, TabsList, TabsTrigger, TabsContent };
//# sourceMappingURL=Tabs.d.ts.map