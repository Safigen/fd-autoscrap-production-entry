import { jsx as r, jsxs as g } from "react/jsx-runtime";
import { cva as f } from "../../node_modules/class-variance-authority/dist/index.js";
import { EmptyState as u, EmptyStateTitle as h, EmptyStateDescription as p } from "../empty-state/EmptyState.js";
import { Skeleton as v } from "../skeleton/Skeleton.js";
import { cn as o } from "../utils/cn.js";
const x = f("grid gap-4", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    }
  },
  defaultVariants: {
    columns: 3
  }
});
function V({
  className: t,
  children: a,
  columns: d = 3,
  isLoading: l = !1,
  loadingCount: c = 6,
  isEmpty: e = !1,
  emptyMessage: m = "No items found",
  emptyDescription: s,
  ...i
}) {
  return e && !l ? /* @__PURE__ */ r("div", { "data-slot": "card-list", className: o(t), ...i, children: /* @__PURE__ */ g(u, { children: [
    /* @__PURE__ */ r(h, { children: m }),
    s && /* @__PURE__ */ r(p, { children: s })
  ] }) }) : /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card-list",
      className: o(x({ columns: d }), t),
      ...i,
      children: l ? Array.from({ length: c }, (S, n) => /* @__PURE__ */ r(
        v,
        {
          "data-slot": "card-list-skeleton",
          className: "h-36 rounded-lg"
        },
        n
      )) : a
    }
  );
}
export {
  V as CardList,
  x as cardListVariants
};
//# sourceMappingURL=CardList.js.map
