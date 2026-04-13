import { jsx as o } from "react/jsx-runtime";
import { Root as n, Arrow as d, Portal as l, Content as s, Provider as f, Trigger as p } from "@radix-ui/react-tooltip";
import { cn as e } from "../utils/cn.js";
function c({
  delayDuration: t = 0,
  ...r
}) {
  return /* @__PURE__ */ o(
    f,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...r
    }
  );
}
function x({
  ...t
}) {
  return /* @__PURE__ */ o(c, { children: /* @__PURE__ */ o(n, { "data-slot": "tooltip", ...t }) });
}
function T({
  ...t
}) {
  return /* @__PURE__ */ o(p, { "data-slot": "tooltip-trigger", ...t });
}
function b({
  className: t,
  ...r
}) {
  return /* @__PURE__ */ o(
    d,
    {
      className: e(
        "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground",
        t
      ),
      ...r
    }
  );
}
function z({
  className: t,
  sideOffset: r = 0,
  children: i,
  ...a
}) {
  return /* @__PURE__ */ o(l, { children: /* @__PURE__ */ o(
    s,
    {
      "data-slot": "tooltip-content",
      sideOffset: r,
      className: e(
        "z-50 w-fit origin-[var(--radix-tooltip-content-transform-origin)] text-balance",
        "rounded bg-foreground px-3 py-1.5 text-xs text-background",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...a,
      children: i
    }
  ) });
}
export {
  x as Tooltip,
  b as TooltipArrow,
  z as TooltipContent,
  c as TooltipProvider,
  T as TooltipTrigger
};
//# sourceMappingURL=Tooltip.js.map
