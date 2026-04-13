import { jsx as e } from "react/jsx-runtime";
import { Checkbox as n, CheckboxIndicator as d } from "../../node_modules/@radix-ui/react-checkbox/dist/index.js";
import { cva as s } from "../../node_modules/class-variance-authority/dist/index.js";
import { clsx as i } from "../../node_modules/clsx/dist/clsx.js";
import m from "../icons/CheckIcon.js";
import l from "../icons/IndeterminateCheckIcon.js";
import { cn as p } from "../utils/cn.js";
const h = s(
  [
    "peer shrink-0 rounded-sm border border-input outline-none",
    "focus-visible:ring-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground"
  ],
  {
    variants: {
      size: {
        md: "size-4",
        lg: "size-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
), b = {
  md: i("size-[14px]"),
  lg: i("size-[18px]")
};
function y({
  className: o,
  size: c,
  ...t
}) {
  const a = c ?? "md", r = b[a];
  return /* @__PURE__ */ e(
    n,
    {
      "data-slot": "checkbox",
      className: p(h({ size: a }), o),
      ...t,
      children: /* @__PURE__ */ e(
        d,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: t.checked === "indeterminate" ? /* @__PURE__ */ e(
            l,
            {
              className: r,
              "data-testid": "indeterminate-check-icon"
            }
          ) : /* @__PURE__ */ e(m, { className: r, "data-testid": "check-icon" })
        }
      )
    }
  );
}
export {
  y as Checkbox
};
//# sourceMappingURL=Checkbox.js.map
