import { jsx as a } from "react/jsx-runtime";
import { cn as o } from "../utils/cn.js";
function n({ className: t, ...e }) {
  return /* @__PURE__ */ a("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ a(
    "table",
    {
      "data-slot": "table",
      className: o("w-full caption-bottom text-sm", t),
      ...e
    }
  ) });
}
function s({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "thead",
    {
      "data-slot": "table-header",
      className: o("[&_tr]:border-b", t),
      ...e
    }
  );
}
function d({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tbody",
    {
      "data-slot": "table-body",
      className: o("[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function b({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: o("border-t bg-surface/50 font-medium", t),
      ...e
    }
  );
}
function c({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tr",
    {
      "data-slot": "table-row",
      className: o(
        "border-b transition-colors hover:bg-surface/50 data-[state=selected]:bg-surface",
        t
      ),
      ...e
    }
  );
}
function u({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "th",
    {
      "data-slot": "table-head",
      className: o(
        "h-10 px-3 text-left align-middle font-medium text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function i({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "td",
    {
      "data-slot": "table-cell",
      className: o("p-3 align-middle", t),
      ...e
    }
  );
}
function m({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    "caption",
    {
      "data-slot": "table-caption",
      className: o("mt-4 text-sm text-muted-foreground", t),
      ...e
    }
  );
}
export {
  n as Table,
  d as TableBody,
  m as TableCaption,
  i as TableCell,
  b as TableFooter,
  u as TableHead,
  s as TableHeader,
  c as TableRow
};
//# sourceMappingURL=Table.js.map
