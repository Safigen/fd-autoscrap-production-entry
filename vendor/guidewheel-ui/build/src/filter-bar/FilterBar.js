import { jsx as e, jsxs as l } from "react/jsx-runtime";
import * as n from "react";
import { Badge as h } from "../badge/Badge.js";
import { Button as s } from "../button/Button.js";
import { cn as t } from "../utils/cn.js";
function C({
  children: r,
  activeFilterCount: a = 0,
  onClearAll: i,
  onRefresh: o,
  loading: p = !1,
  showRefresh: c = !0,
  showFilterToggle: d = !0,
  className: x
}) {
  const [m, u] = n.useState(!1);
  return /* @__PURE__ */ e("div", { "data-slot": "filter-bar", className: t("px-4 py-3", x), children: /* @__PURE__ */ l("div", { className: "flex items-start gap-3 flex-wrap", children: [
    /* @__PURE__ */ e(f.Provider, { value: { expanded: m }, children: r }),
    (i || c || d) && /* @__PURE__ */ l(
      "div",
      {
        "data-slot": "filter-bar-toolbar",
        className: "ml-auto flex items-center gap-2",
        children: [
          i && /* @__PURE__ */ l(
            s,
            {
              variant: "text",
              color: "primary",
              size: "md",
              onClick: i,
              "data-slot": "filter-bar-clear",
              className: "h-[44px] px-2 text-base font-normal normal-case",
              children: [
                "Clear",
                /* @__PURE__ */ e("span", { className: "hidden xl:inline pl-0.5", children: "filters" })
              ]
            }
          ),
          c && o && /* @__PURE__ */ e(
            s,
            {
              variant: "solid",
              color: "default",
              size: "md",
              onClick: o,
              "data-slot": "filter-bar-refresh",
              className: "h-[44px] min-w-[44px] bg-brand-primary-100 text-brand-primary-600",
              "aria-label": "Refresh data",
              children: /* @__PURE__ */ e(v, { className: "size-5" })
            }
          ),
          d && /* @__PURE__ */ l(
            s,
            {
              variant: "solid",
              color: "default",
              size: "md",
              onClick: () => u((b) => !b),
              "data-slot": "filter-bar-toggle",
              className: t(
                "h-[44px] bg-brand-primary-100 text-brand-primary-600 text-base font-medium normal-case",
                m && "border-brand-primary-600"
              ),
              children: [
                /* @__PURE__ */ e(N, { className: "size-4 mr-1" }),
                "Filters",
                a > 0 && /* @__PURE__ */ e(
                  h,
                  {
                    variant: "default",
                    size: "sm",
                    className: "ml-2 bg-[#936bff] text-white rounded-sm",
                    children: a
                  }
                )
              ]
            }
          ),
          p && /* @__PURE__ */ e(
            "span",
            {
              "data-slot": "filter-bar-loading",
              className: "ml-1 mt-0.5 inline-block size-5 animate-spin rounded-full border-2 border-primary border-t-transparent",
              role: "status",
              "aria-label": "Loading"
            }
          )
        ]
      }
    )
  ] }) });
}
const f = n.createContext({
  expanded: !1
});
function F() {
  return n.useContext(f);
}
function w({ children: r, className: a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "filter-bar-filters",
      className: t("flex flex-1 items-center gap-2 flex-wrap", a),
      children: r
    }
  );
}
function M({ children: r, className: a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "filter-bar-section",
      className: t("flex items-center gap-2", a),
      children: r
    }
  );
}
function k({ children: r, className: a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "filter-bar-actions",
      className: t("ml-auto flex items-center gap-2", a),
      children: r
    }
  );
}
function H({ children: r, className: a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "filter-bar-chips",
      className: t("mt-2 flex items-center gap-1.5 flex-wrap", a),
      children: r
    }
  );
}
function v(r) {
  return /* @__PURE__ */ e("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...r, children: /* @__PURE__ */ e("path", { d: "M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46A7.93 7.93 0 0 0 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0 0 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" }) });
}
function N(r) {
  return /* @__PURE__ */ e("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...r, children: /* @__PURE__ */ e("path", { d: "M6 13h12v-2H6M3 6v2h18V6M10 18h4v-2h-4v2z" }) });
}
export {
  C as FilterBar,
  k as FilterBarActions,
  H as FilterBarChips,
  w as FilterBarFilters,
  M as FilterBarSection,
  F as useFilterBarContext
};
//# sourceMappingURL=FilterBar.js.map
