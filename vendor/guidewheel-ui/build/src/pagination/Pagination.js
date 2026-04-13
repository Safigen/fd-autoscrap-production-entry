import { jsxs as b, jsx as n } from "react/jsx-runtime";
import { cn as u } from "../utils/cn.js";
const a = "ellipsis";
function v(e, i, t) {
  const m = t * 2 + 5;
  if (i <= m)
    return Array.from({ length: i }, (s, o) => o + 1);
  const l = Math.max(e - t, 1), c = Math.min(e + t, i), d = l > 2, f = c < i - 1;
  if (!d && f) {
    const s = 3 + 2 * t;
    return [...Array.from({ length: s }, (h, p) => p + 1), a, i];
  }
  if (d && !f) {
    const s = 3 + 2 * t, o = Array.from(
      { length: s },
      (h, p) => i - s + p + 1
    );
    return [1, a, ...o];
  }
  const r = Array.from(
    { length: c - l + 1 },
    (s, o) => l + o
  );
  return [1, a, ...r, a, i];
}
function N({
  currentPage: e,
  totalPages: i,
  onPageChange: t,
  siblingCount: m = 1,
  className: l
}) {
  if (i <= 0) return null;
  const c = v(e, i, m), d = () => {
    e > 1 && t(e - 1);
  }, f = () => {
    e < i && t(e + 1);
  };
  return /* @__PURE__ */ b(
    "nav",
    {
      "data-slot": "pagination",
      "aria-label": "Pagination",
      className: u("flex items-center gap-1", l),
      children: [
        /* @__PURE__ */ n(
          "button",
          {
            "data-slot": "pagination-previous",
            type: "button",
            "aria-label": "Go to previous page",
            disabled: e <= 1,
            onClick: d,
            className: u(
              "inline-flex size-9 items-center justify-center rounded-md text-sm transition-colors",
              "hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "disabled:pointer-events-none disabled:opacity-40"
            ),
            children: /* @__PURE__ */ n(x, { className: "size-4" })
          }
        ),
        c.map((r, s) => {
          if (r === a)
            return /* @__PURE__ */ n(
              "span",
              {
                "data-slot": "pagination-ellipsis",
                className: "inline-flex size-9 items-center justify-center text-sm text-muted-foreground select-none",
                "aria-hidden": "true",
                children: "..."
              },
              `ellipsis-${s}`
            );
          const o = r === e;
          return /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              "data-slot": "pagination-item",
              "aria-label": `Go to page ${r}`,
              "aria-current": o ? "page" : void 0,
              onClick: () => t(r),
              className: u(
                "inline-flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                o ? "bg-primary text-primary-foreground" : "hover:bg-surface text-foreground"
              ),
              children: r
            },
            r
          );
        }),
        /* @__PURE__ */ n(
          "button",
          {
            "data-slot": "pagination-next",
            type: "button",
            "aria-label": "Go to next page",
            disabled: e >= i,
            onClick: f,
            className: u(
              "inline-flex size-9 items-center justify-center rounded-md text-sm transition-colors",
              "hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "disabled:pointer-events-none disabled:opacity-40"
            ),
            children: /* @__PURE__ */ n(g, { className: "size-4" })
          }
        )
      ]
    }
  );
}
function x(e) {
  return /* @__PURE__ */ n(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...e,
      children: /* @__PURE__ */ n("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function g(e) {
  return /* @__PURE__ */ n(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...e,
      children: /* @__PURE__ */ n("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
export {
  N as Pagination,
  v as getPageRange
};
//# sourceMappingURL=Pagination.js.map
