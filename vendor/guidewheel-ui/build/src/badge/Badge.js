import { jsx as o } from "react/jsx-runtime";
import { cva as s } from "class-variance-authority";
import { cn as d } from "../utils/cn.js";
const i = s("inline-flex items-center rounded-full font-medium", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-surface text-foreground",
      success: "bg-success text-success-foreground",
      warning: "bg-warning text-warning-foreground",
      danger: "bg-danger text-danger-foreground",
      outline: "border text-foreground"
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-sm"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
function m({ className: e, variant: r, size: t, children: n, ...a }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "badge",
      className: d(i({ variant: r, size: t }), e),
      ...a,
      children: n
    }
  );
}
export {
  m as Badge,
  i as badgeVariants
};
//# sourceMappingURL=Badge.js.map
