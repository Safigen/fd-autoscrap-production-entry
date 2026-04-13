import { jsx as t, jsxs as s } from "react/jsx-runtime";
import { Root as l, Portal as d, Content as i, Viewport as c, Group as u, Item as m, ItemIndicator as f, ItemText as p, Label as g, Separator as h, Trigger as b, Icon as x, Value as w } from "../../node_modules/@radix-ui/react-select/dist/index.js";
import y from "../icons/CheckIcon.js";
import S from "../icons/ChevronDownIcon.js";
import { cn as o } from "../utils/cn.js";
function j({
  ...e
}) {
  return /* @__PURE__ */ t(l, { "data-slot": "select", ...e });
}
function k({
  ...e
}) {
  return /* @__PURE__ */ t(u, { "data-slot": "select-group", ...e });
}
function T({
  ...e
}) {
  return /* @__PURE__ */ t(w, { "data-slot": "select-value", ...e });
}
function V({
  className: e,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ s(
    b,
    {
      "data-slot": "select-trigger",
      className: o(
        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
        "ring-offset-background placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ t(x, { asChild: !0, children: /* @__PURE__ */ t(S, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function G({
  className: e,
  children: a,
  position: r = "popper",
  ...n
}) {
  return /* @__PURE__ */ t(d, { children: /* @__PURE__ */ t(
    i,
    {
      "data-slot": "select-content",
      className: o(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-card text-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        r === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: r,
      ...n,
      children: /* @__PURE__ */ t(
        c,
        {
          className: o(
            "p-1",
            r === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: a
        }
      )
    }
  ) });
}
function L({
  className: e,
  ...a
}) {
  return /* @__PURE__ */ t(
    g,
    {
      "data-slot": "select-label",
      className: o("px-2 py-1.5 text-sm font-semibold", e),
      ...a
    }
  );
}
function R({
  className: e,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ s(
    m,
    {
      "data-slot": "select-item",
      className: o(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
        "focus:bg-surface focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ t("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ t(f, { children: /* @__PURE__ */ t(y, { className: "size-4" }) }) }),
        /* @__PURE__ */ t(p, { children: a })
      ]
    }
  );
}
function D({
  className: e,
  ...a
}) {
  return /* @__PURE__ */ t(
    h,
    {
      "data-slot": "select-separator",
      className: o("my-1 h-px bg-border-muted", e),
      ...a
    }
  );
}
export {
  j as Select,
  G as SelectContent,
  k as SelectGroup,
  R as SelectItem,
  L as SelectLabel,
  D as SelectSeparator,
  V as SelectTrigger,
  T as SelectValue
};
//# sourceMappingURL=Select.js.map
