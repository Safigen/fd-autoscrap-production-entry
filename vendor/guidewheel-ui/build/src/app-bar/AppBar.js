import { jsxs as e, jsx as a } from "react/jsx-runtime";
import m from "../separator/Separator.js";
import { cn as p } from "../utils/cn.js";
function f({
  title: d,
  subtitle: t,
  breadcrumbs: s,
  actions: r,
  className: n,
  children: l
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "app-bar",
      className: p(
        "min-h-screen bg-[#f9fbfd]",
        "p-4 md:px-6 md:pb-16",
        n
      ),
      children: [
        /* @__PURE__ */ e("div", { "data-slot": "app-bar-header", children: [
          s && /* @__PURE__ */ a("div", { "data-slot": "app-bar-breadcrumbs", className: "mb-1", children: s }),
          /* @__PURE__ */ e("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { "data-slot": "app-bar-content", className: "flex items-baseline", children: [
              /* @__PURE__ */ a("h1", { className: "text-base font-bold leading-tight", children: d }),
              t && /* @__PURE__ */ a("span", { className: "ml-3 font-light text-muted-foreground", children: t })
            ] }),
            r && /* @__PURE__ */ a(
              "div",
              {
                "data-slot": "app-bar-actions",
                className: "flex items-center gap-2",
                children: r
              }
            )
          ] }),
          /* @__PURE__ */ a(m, { className: "mt-3" })
        ] }),
        l && /* @__PURE__ */ a("div", { "data-slot": "app-bar-page-content", className: "mt-4", children: l })
      ]
    }
  );
}
export {
  f as AppBar
};
//# sourceMappingURL=AppBar.js.map
