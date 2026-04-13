import { jsxs as d, jsx as a } from "react/jsx-runtime";
import { useState as l } from "react";
import { cva as b } from "../../node_modules/class-variance-authority/dist/index.js";
import m from "../icons/CloseIcon.js";
import { cn as p } from "../utils/cn.js";
const u = b(
  "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        info: "bg-brand-primary-50 border-brand-primary-200 text-brand-primary-800",
        success: "bg-success-100 border-success-300 text-success-800",
        warning: "bg-warning-100 border-warning-300 text-warning-800",
        danger: "bg-danger-100 border-danger-300 text-danger-800"
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
);
function h({
  className: e,
  variant: t,
  dismissible: n = !1,
  onDismiss: r,
  children: s,
  ...o
}) {
  const [i, c] = l(!1);
  return i ? null : /* @__PURE__ */ d(
    "div",
    {
      "data-slot": "banner",
      role: "status",
      className: p(u({ variant: t }), e),
      ...o,
      children: [
        s,
        n && /* @__PURE__ */ a(
          "button",
          {
            "data-slot": "banner-close",
            type: "button",
            "aria-label": "Dismiss",
            className: "ml-auto shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity",
            onClick: () => {
              c(!0), r == null || r();
            },
            children: /* @__PURE__ */ a(m, { className: "size-4" })
          }
        )
      ]
    }
  );
}
export {
  h as Banner,
  u as bannerVariants
};
//# sourceMappingURL=Banner.js.map
