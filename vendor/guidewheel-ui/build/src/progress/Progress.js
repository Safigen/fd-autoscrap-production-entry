import { jsx as s } from "react/jsx-runtime";
import { Root as i, Indicator as l } from "@radix-ui/react-progress";
import { cva as d } from "class-variance-authority";
import { cn as a } from "../utils/cn.js";
const m = d(
  "relative w-full overflow-hidden rounded-full bg-surface",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function h({
  className: o,
  size: t,
  value: r,
  children: n,
  ...e
}) {
  return /* @__PURE__ */ s(
    i,
    {
      "data-slot": "progress",
      className: a(m({ size: t }), o),
      value: r,
      ...e,
      children: n ?? /* @__PURE__ */ s(f, { value: r })
    }
  );
}
function f({
  className: o,
  value: t,
  ...r
}) {
  return /* @__PURE__ */ s(
    l,
    {
      "data-slot": "progress-indicator",
      className: a(
        "h-full bg-primary rounded-full transition-all duration-300",
        o
      ),
      style: { transform: `translateX(-${100 - (t || 0)}%)` },
      ...r
    }
  );
}
export {
  h as Progress,
  f as ProgressIndicator,
  m as progressVariants
};
//# sourceMappingURL=Progress.js.map
