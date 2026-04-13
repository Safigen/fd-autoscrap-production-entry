import { jsx as t } from "react/jsx-runtime";
import { Root as n, Anchor as i, Portal as d, Content as s, Trigger as p } from "@radix-ui/react-popover";
import { cn as c } from "../utils/cn.js";
function u({
  ...o
}) {
  return /* @__PURE__ */ t(n, { "data-slot": "popover", ...o });
}
function g({
  ...o
}) {
  return /* @__PURE__ */ t(p, { "data-slot": "popover-trigger", ...o });
}
function v({
  className: o,
  align: e = "center",
  sideOffset: r = 0,
  ...a
}) {
  return /* @__PURE__ */ t(d, { children: /* @__PURE__ */ t(
    s,
    {
      "data-slot": "popover-content",
      align: e,
      sideOffset: r,
      className: c(
        "z-50 w-72 rounded-sm border border-muted bg-card text-card-foreground shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2",
        "origin-[var(--radix-popover-content-transform-origin)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        o
      ),
      ...a
    }
  ) });
}
function h({
  ...o
}) {
  return /* @__PURE__ */ t(i, { "data-slot": "popover-anchor", ...o });
}
export {
  u as Popover,
  h as PopoverAnchor,
  v as PopoverContent,
  g as PopoverTrigger
};
//# sourceMappingURL=Popover.js.map
