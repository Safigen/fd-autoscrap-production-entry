import { jsx as s } from "react/jsx-runtime";
import { cva as m } from "../../node_modules/class-variance-authority/dist/index.js";
import { useState as c } from "react";
import { cn as f } from "../utils/cn.js";
const n = m(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function p({ className: e, size: a, children: t, ...l }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "avatar",
      className: f(n({ size: a }), e),
      ...l,
      children: t
    }
  );
}
function w({
  className: e,
  onLoadError: a,
  onError: t,
  ...l
}) {
  const [i, r] = c(!1);
  return i ? null : /* @__PURE__ */ s(
    "img",
    {
      "data-slot": "avatar-image",
      className: f("aspect-square h-full w-full object-cover", e),
      onError: (u) => {
        r(!0), a == null || a(), t == null || t(u);
      },
      ...l
    }
  );
}
function g({ className: e, children: a, ...t }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "avatar-fallback",
      className: f(
        "flex h-full w-full items-center justify-center rounded-full bg-surface text-sm font-medium",
        e
      ),
      ...t,
      children: a
    }
  );
}
export {
  p as Avatar,
  g as AvatarFallback,
  w as AvatarImage,
  n as avatarVariants
};
//# sourceMappingURL=Avatar.js.map
