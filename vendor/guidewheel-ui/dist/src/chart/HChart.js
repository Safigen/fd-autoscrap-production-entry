import { jsxs as f, jsx as t } from "react/jsx-runtime";
import { useRef as n } from "react";
import h from "echarts-for-react";
import "../../node_modules/echarts/index.js";
import { cn as u } from "../utils/cn.js";
import { Skeleton as c } from "../skeleton/Skeleton.js";
import { guidewheelChartTheme as d } from "./chart-theme.js";
import { registerTheme as p } from "../../node_modules/echarts/lib/core/echarts.js";
const o = "guidewheel";
let r = !1;
function g() {
  r || (p(o, d), r = !0);
}
function M({
  option: m,
  height: e = 300,
  isLoading: s = !1,
  className: i,
  onEvents: l
}) {
  g();
  const a = n(null);
  return /* @__PURE__ */ f("div", { "data-slot": "chart", className: u("relative w-full", i), children: [
    s && /* @__PURE__ */ t(
      c,
      {
        className: "absolute inset-0 z-10 rounded-md",
        style: { height: typeof e == "number" ? e : void 0 }
      }
    ),
    /* @__PURE__ */ t(
      h,
      {
        ref: a,
        option: m,
        theme: o,
        notMerge: !0,
        style: { height: e, width: "100%" },
        onEvents: l
      }
    )
  ] });
}
export {
  M as HChart
};
//# sourceMappingURL=HChart.js.map
