import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { Root as s } from "../../node_modules/@radix-ui/react-slot/dist/index.js";
import i from "../icons/MoreHorizontalIcon.js";
import { linkVariants as l } from "../link/common/variants.js";
import { cn as t } from "../utils/cn.js";
function f({ ...r }) {
  return /* @__PURE__ */ a("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...r });
}
function x({ className: r, ...e }) {
  return /* @__PURE__ */ a(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: t(
        [
          "flex list-none flex-wrap items-center gap-1.5",
          "break-words text-base text-muted-foreground",
          "sm:gap-2.5"
        ],
        r
      ),
      ...e
    }
  );
}
function g({ className: r, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: t("inline-flex items-center gap-1.5", r),
      ...e
    }
  );
}
function B({
  asChild: r,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ a(
    r ? s : "a",
    {
      "data-slot": "breadcrumb-link",
      className: t(l(), e),
      ...n
    }
  );
}
function N({ className: r, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: t("font-normal text-foreground", r),
      ...e
    }
  );
}
function h({
  children: r,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: t(e),
      ...n,
      children: r ?? "/"
    }
  );
}
function k({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: t("flex size-9 items-center justify-center", r),
      ...e,
      children: [
        /* @__PURE__ */ a(i, {}),
        /* @__PURE__ */ a("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
export {
  f as Breadcrumb,
  k as BreadcrumbEllipsis,
  g as BreadcrumbItem,
  B as BreadcrumbLink,
  x as BreadcrumbList,
  N as BreadcrumbPage,
  h as BreadcrumbSeparator
};
//# sourceMappingURL=Breadcrumb.js.map
