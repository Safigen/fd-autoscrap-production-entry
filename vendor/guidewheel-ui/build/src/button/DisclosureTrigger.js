import { jsxs as n, jsx as r } from "react/jsx-runtime";
import { cva as c } from "../../node_modules/class-variance-authority/dist/index.js";
import d from "../icons/ChevronDownIcon.js";
import { cn as a } from "../utils/cn.js";
import { Button as g } from "./Button.js";
const l = c(
  [
    "group/disclosure-trigger",
    "data-[state=open]:border-accent data-[state=open]:bg-btn-accent",
    // Darker hover when open.
    "data-[state=open]:hover:bg-brand-grey-300"
  ],
  {
    variants: {
      // Right-padding asymmetry to keep the indicator tighter to right side.
      size: {
        sm: "gap-2 pr-1",
        md: "gap-3 pr-1.5",
        lg: "gap-4 pr-2"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function v({
  className: t,
  size: e = "md",
  children: i,
  ...o
}) {
  const s = e ?? "md";
  return /* @__PURE__ */ n(
    g,
    {
      size: s,
      className: a(
        "flex-shrink",
        l({ size: s }),
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            "data-testid": "disclosure-trigger-content",
            className: "flex-1 truncate text-left",
            children: i
          }
        ),
        /* @__PURE__ */ r(m, {})
      ]
    }
  );
}
function m({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-testid": "disclosure-trigger-indicator",
      className: a(
        "inline-flex flex-shrink-0 transition-transform duration-200",
        "group-data-[state=open]/disclosure-trigger:rotate-180",
        t
      ),
      ...e,
      children: /* @__PURE__ */ r(d, {})
    }
  );
}
export {
  v as DisclosureTrigger,
  m as DisclosureTriggerIndicator
};
//# sourceMappingURL=DisclosureTrigger.js.map
