import { jsx as o } from "react/jsx-runtime";
import { cva as l } from "class-variance-authority";
import { cn as s } from "../utils/cn.js";
const d = l("inline-block h-full", {
  variants: {
    state: {
      runtime: "bg-load-state-runtime",
      idle: "bg-load-state-idle",
      offline: "bg-load-state-offline",
      planned: "bg-load-state-planned",
      nodata: "bg-load-state-nodata"
    }
  },
  defaultVariants: {
    state: "nodata"
  }
});
function g({
  className: t,
  state: a,
  widthPercent: e,
  label: n,
  ...i
}) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "time-segment",
      className: s(d({ state: a }), t),
      style: { width: `${e}%`, minWidth: "1px" },
      title: n,
      ...i
    }
  );
}
export {
  g as TimeSegment,
  d as timeSegmentVariants
};
//# sourceMappingURL=TimeSegment.js.map
