import { jsx as t, jsxs as p, Fragment as u } from "react/jsx-runtime";
import { Root as g } from "@radix-ui/react-slot";
import { IconProvider as v } from "../icons/common/IconContext.js";
import x from "../icons/LoadingIcon.js";
import { cn as b } from "../utils/cn.js";
import { textButtonVariants as C, solidButtonVariants as N } from "./common/variants.js";
const h = {
  solid: N,
  text: C
}, j = {
  sm: "xs",
  md: "sm",
  lg: "md",
  icon: "md"
}, B = {
  sm: "sm",
  md: "md",
  lg: "lg",
  icon: "md"
};
function I({
  size: o,
  children: i
}) {
  return /* @__PURE__ */ p(u, { children: [
    /* @__PURE__ */ t("span", { className: "contents text-transparent", children: i }),
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: "absolute inset-0 flex items-center justify-center",
        children: /* @__PURE__ */ t(x, { size: B[o], className: "animate-spin" })
      }
    )
  ] });
}
function k({
  className: o,
  color: i = "default",
  variant: r = "solid",
  size: a = "md",
  asChild: s = !1,
  loading: m = !1,
  onClick: c,
  children: e,
  ...d
}) {
  const l = s ? g : "button", n = m && !s, f = h[r];
  return /* @__PURE__ */ t(v, { value: { size: j[a] }, children: /* @__PURE__ */ t(
    l,
    {
      "data-slot": "button",
      className: b(
        f({ color: i, size: a }),
        n && "pointer-events-none relative",
        o
      ),
      "aria-disabled": n || void 0,
      "aria-busy": n || void 0,
      onClick: n ? void 0 : c,
      ...d,
      children: n ? /* @__PURE__ */ t(I, { size: a, children: e }) : e
    }
  ) });
}
export {
  k as Button
};
//# sourceMappingURL=Button.js.map
