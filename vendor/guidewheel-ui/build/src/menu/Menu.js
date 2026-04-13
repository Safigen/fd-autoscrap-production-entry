import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as l from "react";
import { Checkbox as C } from "../checkbox/Checkbox.js";
import k from "../icons/CheckIcon.js";
import { Popover as w, PopoverTrigger as O, PopoverContent as P } from "../popover/Popover.js";
import { SearchInput as S } from "../search-input/SearchInput.js";
import { cn as b } from "../utils/cn.js";
function j(i, r) {
  return r === void 0 ? !1 : Array.isArray(r) ? r.includes(i) : r === i;
}
function F({
  trigger: i,
  groups: r,
  selected: x,
  onSelect: m,
  multiple: n = !1,
  searchable: v = !1,
  searchPlaceholder: g = "Search...",
  className: N
}) {
  const [d, u] = l.useState(""), [f, h] = l.useState(!1), p = l.useMemo(() => {
    if (!d) return r;
    const t = d.toLowerCase();
    return r.map((s) => ({
      ...s,
      items: s.items.filter(
        (a) => a.label.toLowerCase().includes(t)
      )
    })).filter((s) => s.items.length > 0);
  }, [r, d]);
  function y(t) {
    m == null || m(t), n || h(!1);
  }
  return l.useEffect(() => {
    f || u("");
  }, [f]), /* @__PURE__ */ o(w, { open: f, onOpenChange: h, children: [
    /* @__PURE__ */ e(O, { asChild: !0, "data-slot": "menu", children: i }),
    /* @__PURE__ */ e(
      P,
      {
        align: "start",
        sideOffset: 4,
        className: b("w-56 p-0", N),
        children: /* @__PURE__ */ o("div", { "data-slot": "menu-content", className: "flex flex-col", children: [
          v && /* @__PURE__ */ e("div", { "data-slot": "menu-search", className: "p-2 border-b", children: /* @__PURE__ */ e(
            S,
            {
              placeholder: g,
              value: d,
              onChange: (t) => u(t.target.value),
              onClear: () => u("")
            }
          ) }),
          /* @__PURE__ */ o(
            "div",
            {
              "data-slot": "menu-items",
              className: "max-h-60 overflow-y-auto py-1",
              role: "listbox",
              "aria-multiselectable": n || void 0,
              children: [
                p.map((t, s) => /* @__PURE__ */ o(l.Fragment, { children: [
                  s > 0 && /* @__PURE__ */ e(
                    "div",
                    {
                      "data-slot": "menu-separator",
                      className: "-mx-0 my-1 h-px bg-border-muted"
                    }
                  ),
                  t.label && /* @__PURE__ */ e(
                    "div",
                    {
                      "data-slot": "menu-group-label",
                      className: "px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                      children: t.label
                    }
                  ),
                  t.items.map((a) => {
                    const c = j(a.id, x);
                    return /* @__PURE__ */ o(
                      "button",
                      {
                        type: "button",
                        role: "option",
                        "aria-selected": c,
                        "aria-disabled": a.disabled || void 0,
                        disabled: a.disabled,
                        "data-slot": "menu-item",
                        className: b(
                          "flex w-full cursor-default select-none items-center gap-2 rounded-sm px-3 py-1.5 text-sm outline-none transition-colors",
                          "hover:bg-surface hover:text-foreground",
                          "focus-visible:bg-surface focus-visible:text-foreground",
                          "disabled:pointer-events-none disabled:opacity-50",
                          c && !n && "text-primary"
                        ),
                        onClick: () => y(a.id),
                        children: [
                          n && /* @__PURE__ */ e(
                            C,
                            {
                              checked: c,
                              tabIndex: -1,
                              "aria-hidden": "true",
                              className: "pointer-events-none"
                            }
                          ),
                          a.icon && /* @__PURE__ */ e(
                            "span",
                            {
                              "data-slot": "menu-item-icon",
                              className: "flex shrink-0 items-center",
                              children: a.icon
                            }
                          ),
                          /* @__PURE__ */ e("span", { className: "flex-1 truncate text-left", children: a.label }),
                          !n && c && /* @__PURE__ */ e(k, { className: "ml-auto size-4 shrink-0" })
                        ]
                      },
                      a.id
                    );
                  })
                ] }, t.label ?? `group-${s}`)),
                p.length === 0 && /* @__PURE__ */ e(
                  "div",
                  {
                    "data-slot": "menu-empty",
                    className: "px-3 py-6 text-center text-sm text-muted-foreground",
                    children: "No results found"
                  }
                )
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  F as Menu
};
//# sourceMappingURL=Menu.js.map
