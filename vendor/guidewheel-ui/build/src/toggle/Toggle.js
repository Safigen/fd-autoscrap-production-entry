import { jsx as r } from "react/jsx-runtime";
import { Root as m } from "@radix-ui/react-toggle";
import g from "../icons/CheckIcon.js";
import s from "../icons/IndeterminateCheckIcon.js";
import { cn as n } from "../utils/cn.js";
import { toggleVariants as d } from "./common/variants.js";
function x({
  className: e,
  children: o,
  indeterminate: t = !1,
  ...a
}) {
  const i = o || (t ? /* @__PURE__ */ r(s, { className: "text-primary-foreground" }) : /* @__PURE__ */ r(g, { className: "text-transparent group-data-[state=on]/toggle:text-background" }));
  return /* @__PURE__ */ r(
    "div",
    {
      className: n(
        "inline-flex size-4 items-center justify-center rounded-sm border border-input transition-colors",
        "group-data-[state=on]/toggle:border-primary group-data-[state=on]/toggle:bg-primary",
        "data-[indeterminate=true]:border-primary data-[indeterminate=true]:bg-primary",
        e
      ),
      "data-indeterminate": t,
      ...a,
      children: i
    }
  );
}
function y({
  className: e,
  size: o,
  children: t,
  ...a
}) {
  return /* @__PURE__ */ r(
    m,
    {
      "data-slot": "toggle",
      className: n("group/toggle", d({ size: o, className: e })),
      ...a,
      children: t
    }
  );
}
export {
  y as Toggle,
  x as ToggleIndicator
};
//# sourceMappingURL=Toggle.js.map
