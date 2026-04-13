import { jsx as a, jsxs as l } from "react/jsx-runtime";
import { Root as s, Close as n, Content as d, Description as c, Overlay as g, Portal as u, Title as f, Trigger as m } from "@radix-ui/react-dialog";
import p from "../icons/CloseIcon.js";
import { cn as e } from "../utils/cn.js";
function v({
  ...t
}) {
  return /* @__PURE__ */ a(s, { "data-slot": "dialog", ...t });
}
function C({
  ...t
}) {
  return /* @__PURE__ */ a(m, { "data-slot": "dialog-trigger", ...t });
}
function x({
  ...t
}) {
  return /* @__PURE__ */ a(u, { "data-slot": "dialog-portal", ...t });
}
function D({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ a(
    g,
    {
      "data-slot": "dialog-overlay",
      className: e(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        t
      ),
      ...o
    }
  );
}
function w({
  className: t,
  children: o,
  showClose: i = !0,
  ...r
}) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ a(D, {}),
    /* @__PURE__ */ l(
      d,
      {
        "data-slot": "dialog-content",
        className: e(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
          "gap-4 rounded border bg-background p-3 shadow-lg md:gap-6",
          "duration-500 data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out data-[state=open]:zoom-in-0",
          "sm:max-w-lg",
          t
        ),
        ...r,
        children: [
          o,
          i && /* @__PURE__ */ l(
            n,
            {
              "data-slot": "dialog-close",
              className: e(
                "absolute right-3 top-3 rounded-sm opacity-70 transition-opacity",
                "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ a(p, { className: "size-4" }),
                /* @__PURE__ */ a("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function z({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "dialog-header",
      className: e("flex flex-col gap-2 text-center sm:text-left", t),
      ...o
    }
  );
}
function T({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "dialog-footer",
      className: e(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        t
      ),
      ...o
    }
  );
}
function j({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ a(
    f,
    {
      "data-slot": "dialog-title",
      className: e("text-lg font-semibold text-muted-foreground", t),
      ...o
    }
  );
}
function k({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ a(
    c,
    {
      "data-slot": "dialog-description",
      className: e("text-card-foreground", t),
      ...o
    }
  );
}
function O({
  ...t
}) {
  return /* @__PURE__ */ a(n, { "data-slot": "dialog-close", ...t });
}
export {
  v as Dialog,
  O as DialogClose,
  w as DialogContent,
  k as DialogDescription,
  T as DialogFooter,
  z as DialogHeader,
  D as DialogOverlay,
  x as DialogPortal,
  j as DialogTitle,
  C as DialogTrigger
};
//# sourceMappingURL=Dialog.js.map
