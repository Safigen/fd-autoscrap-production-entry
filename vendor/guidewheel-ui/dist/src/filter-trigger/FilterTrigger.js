import { jsxs as n, jsx as e } from "react/jsx-runtime";
import m from "../icons/ChevronDownIcon.js";
import { cn as l } from "../utils/cn.js";
function b({
  label: s,
  value: r,
  isDirty: o = !1,
  icon: t,
  onClick: i,
  disabled: a = !1,
  className: d
}) {
  return /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      "data-slot": "filter-trigger",
      disabled: a,
      onClick: i,
      className: l(
        "inline-flex h-[44px] items-center gap-1.5 rounded border px-3 text-sm",
        "transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        o ? "border-brand-primary-500 bg-brand-primary-100" : "border-brand-grey-400 bg-white",
        d
      ),
      children: [
        t && /* @__PURE__ */ e("span", { className: "flex shrink-0 items-center", children: t }),
        /* @__PURE__ */ n("span", { className: "text-muted-foreground font-medium", children: [
          s,
          ":"
        ] }),
        r && /* @__PURE__ */ e("span", { className: "text-foreground", children: r }),
        /* @__PURE__ */ e(
          m,
          {
            size: "xs",
            className: "ml-0.5 shrink-0 text-muted-foreground"
          }
        )
      ]
    }
  );
}
export {
  b as FilterTrigger
};
//# sourceMappingURL=FilterTrigger.js.map
