import { jsx as t, jsxs as r } from "react/jsx-runtime";
import { Root as l, CheckboxItem as m, ItemIndicator as d, Portal as s, Content as c, Item as p, Label as f, RadioGroup as b, RadioItem as g, Separator as w, Sub as x, SubContent as h, SubTrigger as I, Trigger as N } from "../../node_modules/@radix-ui/react-dropdown-menu/dist/index.js";
import i from "../icons/CheckIcon.js";
import D from "../icons/ChevronRightIcon.js";
import { cn as n } from "../utils/cn.js";
function v({
  ...e
}) {
  return /* @__PURE__ */ t(l, { "data-slot": "dropdown-menu", ...e });
}
function R({
  ...e
}) {
  return /* @__PURE__ */ t(
    N,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function k({
  className: e,
  sideOffset: o = 4,
  ...a
}) {
  return /* @__PURE__ */ t(s, { children: /* @__PURE__ */ t(
    c,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: o,
      className: n(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-card p-1 text-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...a
    }
  ) });
}
function T({
  className: e,
  ...o
}) {
  return /* @__PURE__ */ t(
    p,
    {
      "data-slot": "dropdown-menu-item",
      className: n(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "focus:bg-surface focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      ...o
    }
  );
}
function j({
  className: e,
  children: o,
  checked: a,
  ...u
}) {
  return /* @__PURE__ */ r(
    m,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: n(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
        "focus:bg-surface focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      checked: a,
      ...u,
      children: [
        /* @__PURE__ */ t("span", { className: "absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ t(d, { children: /* @__PURE__ */ t(i, { className: "size-4" }) }) }),
        o
      ]
    }
  );
}
function G({
  ...e
}) {
  return /* @__PURE__ */ t(
    b,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...e
    }
  );
}
function L({
  className: e,
  children: o,
  ...a
}) {
  return /* @__PURE__ */ r(
    g,
    {
      "data-slot": "dropdown-menu-radio-item",
      className: n(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
        "focus:bg-surface focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      ...a,
      children: [
        /* @__PURE__ */ t("span", { className: "absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ t(d, { children: /* @__PURE__ */ t(i, { className: "size-4" }) }) }),
        o
      ]
    }
  );
}
function P({
  className: e,
  ...o
}) {
  return /* @__PURE__ */ t(
    f,
    {
      "data-slot": "dropdown-menu-label",
      className: n("px-2 py-1.5 text-sm font-semibold", e),
      ...o
    }
  );
}
function q({
  className: e,
  ...o
}) {
  return /* @__PURE__ */ t(
    w,
    {
      "data-slot": "dropdown-menu-separator",
      className: n("-mx-1 my-1 h-px bg-border-muted", e),
      ...o
    }
  );
}
function A({
  ...e
}) {
  return /* @__PURE__ */ t(x, { "data-slot": "dropdown-menu-sub", ...e });
}
function B({
  className: e,
  children: o,
  ...a
}) {
  return /* @__PURE__ */ r(
    I,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      className: n(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "focus:bg-surface",
        "data-[state=open]:bg-surface",
        e
      ),
      ...a,
      children: [
        o,
        /* @__PURE__ */ t(D, { className: "ml-auto size-4" })
      ]
    }
  );
}
function E({
  className: e,
  ...o
}) {
  return /* @__PURE__ */ t(s, { children: /* @__PURE__ */ t(
    h,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: n(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-card p-1 text-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...o
    }
  ) });
}
export {
  v as DropdownMenu,
  j as DropdownMenuCheckboxItem,
  k as DropdownMenuContent,
  T as DropdownMenuItem,
  P as DropdownMenuLabel,
  G as DropdownMenuRadioGroup,
  L as DropdownMenuRadioItem,
  q as DropdownMenuSeparator,
  A as DropdownMenuSub,
  E as DropdownMenuSubContent,
  B as DropdownMenuSubTrigger,
  R as DropdownMenuTrigger
};
//# sourceMappingURL=DropdownMenu.js.map
