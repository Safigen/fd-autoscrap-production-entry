import { jsxs as o, jsx as s } from "react/jsx-runtime";
import { cn as r } from "../utils/cn.js";
function h(t, e) {
  return typeof t == "string" && t.length > 4 ? "text-xl pb-1" : e === "primary" ? "text-3xl" : "text-2xl";
}
function y(t) {
  return t === "primary" ? "text-2xl" : "text-lg";
}
function N(t, e) {
  return t === "primary" ? e === "on-target" ? "text-success-700" : "text-grey-1100" : "text-grey-900";
}
function b({
  value: t,
  unit: e = "%",
  placeholder: c = "N/A",
  variant: i = "regular",
  status: d = "none",
  disabled: x = !1,
  label: n,
  size: z,
  className: u,
  children: m,
  ...g
}) {
  const l = t != null, a = l ? t : c, f = h(a, i), p = y(i), C = N(i, d);
  return /* @__PURE__ */ o("div", { "data-slot": "metric-tile", className: r(u), ...g, children: [
    n && /* @__PURE__ */ s(
      "span",
      {
        "data-slot": "metric-tile-label",
        className: "text-xs text-muted-foreground",
        children: n
      }
    ),
    /* @__PURE__ */ o("div", { className: r("flex grow items-start", C), children: [
      /* @__PURE__ */ s(
        "div",
        {
          className: r(f, "font-bold leading-none", {
            "text-grey-500": x
          }),
          "data-testid": "value",
          children: a
        }
      ),
      /* @__PURE__ */ s("div", { className: r(p, "leading-none"), "data-testid": "unit", children: l ? e : "" }),
      /* @__PURE__ */ s("div", { className: "grow" })
    ] }),
    m
  ] });
}
export {
  b as MetricTile
};
//# sourceMappingURL=MetricTile.js.map
