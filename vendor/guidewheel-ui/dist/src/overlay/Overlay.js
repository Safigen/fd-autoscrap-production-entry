import { jsx as a } from "react/jsx-runtime";
import { Portal as n } from "../../node_modules/@radix-ui/react-portal/dist/index.js";
import { cn as r } from "../utils/cn.js";
function d({ className: e, open: t = !1, ...o }) {
  return t ? /* @__PURE__ */ a(n, { children: /* @__PURE__ */ a(
    "div",
    {
      role: "status",
      "aria-busy": "true",
      "data-slot": "overlay",
      className: r(
        "fixed inset-0 z-50 bg-black/50",
        "pointer-events-auto",
        e
      ),
      ...o
    }
  ) }) : null;
}
function c({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "overlay-content",
      className: r(
        "fixed left-1/2 top-1/2 z-50 grid w-auto max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
        "gap-4 rounded border bg-background p-3 shadow-lg md:gap-6",
        "pointer-events-none select-none",
        e
      ),
      ...t
    }
  );
}
export {
  d as Overlay,
  c as OverlayContent
};
//# sourceMappingURL=Overlay.js.map
