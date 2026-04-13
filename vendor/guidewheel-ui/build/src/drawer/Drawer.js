import { jsx as e, jsxs as o } from "react/jsx-runtime";
import { Root as d, Close as s, Content as l, Description as c, Overlay as f, Portal as u, Title as m, Trigger as p } from "@radix-ui/react-dialog";
import { cva as g } from "class-variance-authority";
import w from "../icons/CloseIcon.js";
import { cn as r } from "../utils/cn.js";
function T({
  ...t
}) {
  return /* @__PURE__ */ e(d, { "data-slot": "drawer", ...t });
}
function j({
  ...t
}) {
  return /* @__PURE__ */ e(p, { "data-slot": "drawer-trigger", ...t });
}
function h({
  ...t
}) {
  return /* @__PURE__ */ e(u, { "data-slot": "drawer-portal", ...t });
}
function x({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    f,
    {
      "data-slot": "drawer-overlay",
      className: r(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        t
      ),
      ...a
    }
  );
}
const b = g("fixed z-50 bg-card shadow-lg", {
  variants: {
    side: {
      left: [
        "inset-y-0 left-0 w-80 border-r",
        "data-[state=open]:animate-in data-[state=open]:slide-in-from-left",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left"
      ],
      right: [
        "inset-y-0 right-0 w-80 border-l",
        "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
      ],
      bottom: [
        "inset-x-0 bottom-0 h-auto max-h-[85vh] border-t rounded-t-lg",
        "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom"
      ]
    }
  },
  defaultVariants: {
    side: "right"
  }
});
function z({
  className: t,
  children: a,
  side: n = "right",
  ...i
}) {
  return /* @__PURE__ */ o(h, { children: [
    /* @__PURE__ */ e(x, {}),
    /* @__PURE__ */ o(
      l,
      {
        "data-slot": "drawer-content",
        className: r(b({ side: n }), t),
        ...i,
        children: [
          a,
          /* @__PURE__ */ o(
            s,
            {
              "data-slot": "drawer-close",
              className: r(
                "absolute right-3 top-3 rounded-sm opacity-70 transition-opacity",
                "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ e(w, { className: "size-4" }),
                /* @__PURE__ */ e("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function O({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "drawer-header",
      className: r("flex flex-col gap-2 p-4", t),
      ...a
    }
  );
}
function P({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    m,
    {
      "data-slot": "drawer-title",
      className: r("text-lg font-semibold text-muted-foreground", t),
      ...a
    }
  );
}
function V({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    c,
    {
      "data-slot": "drawer-description",
      className: r("text-sm text-card-foreground", t),
      ...a
    }
  );
}
function k({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "drawer-footer",
      className: r(
        "flex flex-col-reverse gap-2 p-4 sm:flex-row sm:justify-end",
        t
      ),
      ...a
    }
  );
}
function F({
  ...t
}) {
  return /* @__PURE__ */ e(s, { "data-slot": "drawer-close", ...t });
}
export {
  T as Drawer,
  F as DrawerClose,
  z as DrawerContent,
  V as DrawerDescription,
  k as DrawerFooter,
  O as DrawerHeader,
  x as DrawerOverlay,
  h as DrawerPortal,
  P as DrawerTitle,
  j as DrawerTrigger,
  b as drawerContentVariants
};
//# sourceMappingURL=Drawer.js.map
