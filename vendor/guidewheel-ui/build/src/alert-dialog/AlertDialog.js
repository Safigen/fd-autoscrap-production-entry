import { jsx as e, jsxs as i } from "react/jsx-runtime";
import { Root as s, Action as d, Cancel as c, Content as g, Description as u, Overlay as f, Portal as m, Title as p, Trigger as x } from "@radix-ui/react-alert-dialog";
import { solidButtonVariants as n } from "../button/common/variants.js";
import { cn as o } from "../utils/cn.js";
function T({
  ...t
}) {
  return /* @__PURE__ */ e(s, { "data-slot": "alert-dialog", ...t });
}
function w({
  ...t
}) {
  return /* @__PURE__ */ e(x, { "data-slot": "alert-dialog-trigger", ...t });
}
function D({
  ...t
}) {
  return /* @__PURE__ */ e(m, { "data-slot": "alert-dialog-portal", ...t });
}
function A({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    f,
    {
      "data-slot": "alert-dialog-overlay",
      className: o(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        t
      ),
      ...a
    }
  );
}
function z({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ e(A, {}),
    /* @__PURE__ */ e(
      g,
      {
        "data-slot": "alert-dialog-content",
        className: o(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
          "gap-4 rounded border bg-background p-3 shadow-lg md:gap-6",
          "duration-500 data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out data-[state=open]:zoom-in-0",
          "sm:max-w-lg",
          t
        ),
        ...a
      }
    )
  ] });
}
function j({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: o("flex flex-col gap-2 text-center sm:text-left", t),
      ...a
    }
  );
}
function C({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: o(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        t
      ),
      ...a
    }
  );
}
function O({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    p,
    {
      "data-slot": "alert-dialog-title",
      className: o("text-lg font-semibold text-muted-foreground", t),
      ...a
    }
  );
}
function P({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    u,
    {
      "data-slot": "alert-dialog-description",
      className: o("text-card-foreground", t),
      ...a
    }
  );
}
function k({
  asChild: t = !1,
  className: a,
  ...l
}) {
  const r = t ? null : n({ color: "danger" });
  return /* @__PURE__ */ e(
    d,
    {
      asChild: t,
      className: o(r, a),
      ...l
    }
  );
}
function R({
  asChild: t = !1,
  className: a,
  ...l
}) {
  const r = t ? null : n({ color: "default" });
  return /* @__PURE__ */ e(
    c,
    {
      asChild: t,
      className: o(r, a),
      ...l
    }
  );
}
export {
  T as AlertDialog,
  k as AlertDialogAction,
  R as AlertDialogCancel,
  z as AlertDialogContent,
  P as AlertDialogDescription,
  C as AlertDialogFooter,
  j as AlertDialogHeader,
  A as AlertDialogOverlay,
  D as AlertDialogPortal,
  O as AlertDialogTitle,
  w as AlertDialogTrigger
};
//# sourceMappingURL=AlertDialog.js.map
