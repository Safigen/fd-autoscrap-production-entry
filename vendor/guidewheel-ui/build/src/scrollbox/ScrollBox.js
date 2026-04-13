import { jsx as e, jsxs as s } from "react/jsx-runtime";
import { cn as n } from "../utils/cn.js";
const a = ({
  children: o,
  className: r,
  ...t
}) => /* @__PURE__ */ e(
  "div",
  {
    className: n(
      "overflow-auto focus-visible:outline-none focus-visible:ring-2",
      r
    ),
    ...t,
    children: o
  }
), c = ({
  children: o,
  className: r,
  ...t
}) => /* @__PURE__ */ s("div", { className: "relative pb-3", ...t, children: [
  o,
  /* @__PURE__ */ e(
    "div",
    {
      className: n(
        [
          "pointer-events-none absolute bottom-0 right-0 h-8",
          "w-full bg-gradient-to-t from-background to-transparent"
        ],
        r
      )
    }
  )
] });
export {
  a as ScrollBox,
  c as ScrollBoxShadowContainer
};
//# sourceMappingURL=ScrollBox.js.map
