import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type VariantProps } from "class-variance-authority";
/**
 * A panel that slides in from the edge of the screen.
 * Uses Radix Dialog primitives with slide-in animations instead of centering.
 */
declare function Drawer({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function DrawerTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function DrawerPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
declare function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>): import("react/jsx-runtime").JSX.Element;
declare const drawerContentVariants: (props?: ({
    side?: "left" | "right" | "bottom" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function DrawerContent({ className, children, side, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & VariantProps<typeof drawerContentVariants>): import("react/jsx-runtime").JSX.Element;
declare function DrawerHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
declare function DrawerFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function DrawerClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, drawerContentVariants, };
//# sourceMappingURL=Drawer.d.ts.map