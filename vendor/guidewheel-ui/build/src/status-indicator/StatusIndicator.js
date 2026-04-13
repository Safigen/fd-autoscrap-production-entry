import { jsx as r } from "react/jsx-runtime";
import { cva as o } from "class-variance-authority";
import { cn as d } from "../utils/cn.js";
const e = o("shrink-0", {
  variants: {
    variant: {
      dot: "rounded-full",
      bar: "rounded-sm w-full"
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    },
    state: {
      runtime: "bg-load-state-runtime",
      idle: "bg-load-state-idle",
      offline: "bg-load-state-offline",
      planned: "bg-load-state-planned",
      nodata: "bg-load-state-nodata"
    }
  },
  compoundVariants: [
    // Dot sizes
    { variant: "dot", size: "sm", class: "h-2 w-2" },
    { variant: "dot", size: "md", class: "h-3 w-3" },
    { variant: "dot", size: "lg", class: "h-4 w-4" },
    // Bar sizes
    { variant: "bar", size: "sm", class: "h-1" },
    { variant: "bar", size: "md", class: "h-2" },
    { variant: "bar", size: "lg", class: "h-3" }
  ],
  defaultVariants: {
    variant: "dot",
    size: "md",
    state: "nodata"
  }
});
function u({
  className: a,
  variant: t,
  size: s,
  state: n,
  ...i
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "status-indicator",
      className: d(e({ variant: t, size: s, state: n }), a),
      ...i
    }
  );
}
export {
  u as StatusIndicator,
  e as statusIndicatorVariants
};
//# sourceMappingURL=StatusIndicator.js.map
