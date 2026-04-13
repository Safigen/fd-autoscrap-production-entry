import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
declare function TooltipProvider({ delayDuration, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>): import("react/jsx-runtime").JSX.Element;
/**
 * A popup that displays information related to an element when the element
 * receives keyboard focus or the mouse hovers over it.
 */
declare function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function TooltipArrow({ className, ...props }: React.ComponentProps<typeof TooltipPrimitive.Arrow>): import("react/jsx-runtime").JSX.Element;
declare function TooltipContent({ className, sideOffset, children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Tooltip, TooltipTrigger, TooltipArrow, TooltipContent, TooltipProvider, };
//# sourceMappingURL=Tooltip.d.ts.map