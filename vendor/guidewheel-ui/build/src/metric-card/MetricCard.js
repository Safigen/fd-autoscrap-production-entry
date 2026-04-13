import { jsxs as o, jsx as e } from "react/jsx-runtime";
import { cva as b } from "class-variance-authority";
import { Card as h, CardHeader as x, CardTitle as g, CardContent as i } from "../card/Card.js";
import { MetricTile as v } from "../metric-tile/MetricTile.js";
import { StatusIndicator as N } from "../status-indicator/StatusIndicator.js";
import { cn as m } from "../utils/cn.js";
const w = b("border-l-4", {
  variants: {
    state: {
      runtime: "border-l-load-state-runtime",
      idle: "border-l-load-state-idle",
      offline: "border-l-load-state-offline",
      planned: "border-l-load-state-planned",
      nodata: "border-l-load-state-nodata"
    }
  },
  defaultVariants: {
    state: "nodata"
  }
});
function M({
  className: c,
  title: f,
  subtitle: l,
  state: s = "nodata",
  metrics: t,
  onClick: r,
  children: n,
  ...p
}) {
  const d = typeof r == "function", u = t && t.length > 0 ? t.length <= 2 ? "grid-cols-2" : "grid-cols-3" : "";
  return /* @__PURE__ */ o(
    h,
    {
      "data-slot": "metric-card",
      className: m(
        w({ state: s }),
        d && "cursor-pointer shadow-sm transition-shadow hover:shadow-md",
        c
      ),
      onClick: r,
      role: d ? "button" : void 0,
      tabIndex: d ? 0 : void 0,
      onKeyDown: d ? (a) => {
        (a.key === "Enter" || a.key === " ") && (a.preventDefault(), r == null || r());
      } : void 0,
      ...p,
      children: [
        /* @__PURE__ */ o(x, { className: "flex flex-row items-center gap-2 pb-2", children: [
          /* @__PURE__ */ e(N, { state: s, variant: "dot", size: "sm" }),
          /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(g, { className: "text-sm", children: f }),
            l && /* @__PURE__ */ e(
              "p",
              {
                "data-slot": "metric-card-subtitle",
                className: "text-xs text-muted-foreground",
                children: l
              }
            )
          ] })
        ] }),
        t && t.length > 0 && /* @__PURE__ */ e(i, { className: "pb-3", children: /* @__PURE__ */ e(
          "div",
          {
            "data-slot": "metric-card-grid",
            className: m("grid gap-2", u),
            children: t.map((a) => /* @__PURE__ */ e(
              v,
              {
                label: a.label,
                value: a.value,
                unit: a.unit,
                size: "sm"
              },
              a.label
            ))
          }
        ) }),
        n && /* @__PURE__ */ e(i, { "data-slot": "metric-card-extra", className: "pt-0", children: n })
      ]
    }
  );
}
export {
  M as MetricCard,
  w as metricCardBorderVariants
};
//# sourceMappingURL=MetricCard.js.map
