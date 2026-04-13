import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { Button as x } from "../button/Button.js";
import { EmptyState as N, EmptyStateTitle as w, EmptyStateDescription as z } from "../empty-state/EmptyState.js";
import { Skeleton as T } from "../skeleton/Skeleton.js";
import { Table as k, TableHeader as C, TableRow as n, TableHead as y, TableBody as B, TableCell as f } from "../table/Table.js";
import { cn as H } from "../utils/cn.js";
const h = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
function M({
  active: a,
  direction: r
}) {
  return a ? r === "asc" ? /* @__PURE__ */ e(
    "svg",
    {
      "aria-hidden": "true",
      className: "ml-1 inline-block size-4",
      viewBox: "0 0 16 16",
      fill: "currentColor",
      children: /* @__PURE__ */ e("path", { d: "M8 4l4 5H4l4-5z" })
    }
  ) : /* @__PURE__ */ e(
    "svg",
    {
      "aria-hidden": "true",
      className: "ml-1 inline-block size-4",
      viewBox: "0 0 16 16",
      fill: "currentColor",
      children: /* @__PURE__ */ e("path", { d: "M8 12l-4-5h8l-4 5z" })
    }
  ) : /* @__PURE__ */ e(
    "svg",
    {
      "aria-hidden": "true",
      className: "ml-1 inline-block size-4 text-muted-foreground/50",
      viewBox: "0 0 16 16",
      fill: "currentColor",
      children: /* @__PURE__ */ e("path", { d: "M8 4l3 4H5l3-4zm0 8L5 8h6l-3 4z" })
    }
  );
}
function R({
  columns: a,
  data: r,
  sortBy: s,
  sortDirection: p,
  onSort: o,
  isLoading: c = !1,
  loadingRows: g = 5,
  emptyMessage: v = "No data available",
  emptyDescription: m,
  className: b
}) {
  return /* @__PURE__ */ t("div", { "data-slot": "data-table", className: H(b), children: [
    /* @__PURE__ */ t(k, { children: [
      /* @__PURE__ */ e(C, { children: /* @__PURE__ */ e(n, { children: a.map((i) => /* @__PURE__ */ e(
        y,
        {
          style: i.width ? { width: i.width } : void 0,
          className: i.align ? h[i.align] : void 0,
          children: i.sortable && o ? /* @__PURE__ */ t(
            x,
            {
              variant: "text",
              size: "sm",
              onClick: () => o(i.id),
              className: "-ml-2 font-medium",
              children: [
                i.header,
                /* @__PURE__ */ e(
                  M,
                  {
                    active: s === i.id,
                    direction: s === i.id ? p : void 0
                  }
                )
              ]
            }
          ) : i.header
        },
        i.id
      )) }) }),
      /* @__PURE__ */ e(B, { children: c ? Array.from({ length: g }, (i, d) => /* @__PURE__ */ e(n, { children: a.map((l) => /* @__PURE__ */ e(
        f,
        {
          className: l.align ? h[l.align] : void 0,
          children: /* @__PURE__ */ e(T, { className: "h-4 w-3/4" })
        },
        l.id
      )) }, `skeleton-${d}`)) : r.length === 0 ? null : r.map((i, d) => /* @__PURE__ */ e(n, { children: a.map((l) => /* @__PURE__ */ e(
        f,
        {
          className: l.align ? h[l.align] : void 0,
          children: l.accessor(i)
        },
        l.id
      )) }, d)) })
    ] }),
    !c && r.length === 0 && /* @__PURE__ */ t(N, { children: [
      /* @__PURE__ */ e(w, { children: v }),
      m && /* @__PURE__ */ e(z, { children: m })
    ] })
  ] });
}
export {
  R as DataTable
};
//# sourceMappingURL=DataTable.js.map
