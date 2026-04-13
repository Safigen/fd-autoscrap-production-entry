import { jsx as i } from "react/jsx-runtime";
import * as s from "react";
import { useMemo as p } from "react";
import { Root as c, Item as d } from "../../node_modules/@radix-ui/react-toggle-group/dist/index.js";
import { cva as f } from "../../node_modules/class-variance-authority/dist/index.js";
import { cn as l } from "../utils/cn.js";
import { spacingLength as v } from "../utils/tw3-compat.js";
import { toggleVariants as x } from "./common/variants.js";
const g = s.createContext({
  size: "md"
}), z = f(
  [
    "group/toggle-group flex items-stretch gap-[var(--gap)] rounded-md",
    "bg-transparent",
    "data-[orientation=vertical]:flex-col"
  ],
  {
    variants: {
      variant: {
        outline: "border border-input p-1",
        default: null
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function T({
  className: e,
  children: a,
  spacing: t = 0,
  orientation: r = "horizontal",
  variant: o = "default",
  /* variants to set for child items */
  size: n,
  ...m
}) {
  const u = p(
    () => ({
      size: n
    }),
    [n]
  );
  return /* @__PURE__ */ i(
    c,
    {
      "data-slot": "toggle-group",
      style: { "--gap": v(t) },
      "data-size": n,
      "data-spacing": t,
      "data-orientation": r,
      className: l(z({ variant: o }), e),
      ...m,
      children: /* @__PURE__ */ i(g.Provider, { value: u, children: a })
    }
  );
}
function N({
  className: e,
  children: a,
  size: t,
  ...r
}) {
  const o = s.useContext(g);
  return /* @__PURE__ */ i(
    d,
    {
      "data-slot": "toggle-group-item",
      "data-size": o.size || t,
      className: l(
        x({
          size: o.size || t
        }),
        "shrink-0 focus:z-10 focus-visible:z-10",
        e
      ),
      ...r,
      children: a
    }
  );
}
export {
  T as ToggleGroup,
  N as ToggleGroupItem
};
//# sourceMappingURL=ToggleGroup.js.map
