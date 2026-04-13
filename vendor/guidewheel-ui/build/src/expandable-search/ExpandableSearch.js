import { jsxs as h, jsx as o } from "react/jsx-runtime";
import * as l from "react";
import m from "../icons/SearchIcon.js";
import { cn as x } from "../utils/cn.js";
function y({
  value: e = "",
  onChange: n,
  placeholder: s = "Search...",
  className: i
}) {
  const [c, r] = l.useState(!1), a = l.useRef(null), d = c || e.length > 0;
  function u() {
    r(!0);
  }
  function f() {
    (!e || e.length === 0) && r(!1);
  }
  function p() {
    var t;
    r(!0), (t = a.current) == null || t.focus();
  }
  return /* @__PURE__ */ h(
    "div",
    {
      "data-slot": "expandable-search",
      className: x(
        "relative inline-flex h-[44px] items-center overflow-hidden rounded border border-brand-grey-400 bg-white",
        i
      ),
      style: {
        width: d ? 300 : 45,
        transition: "width 0.2s ease-in-out"
      },
      children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "flex h-full w-[45px] shrink-0 items-center justify-center text-muted-foreground",
            onClick: p,
            tabIndex: -1,
            "aria-label": "Search",
            children: /* @__PURE__ */ o(m, { size: "sm" })
          }
        ),
        /* @__PURE__ */ o(
          "input",
          {
            ref: a,
            type: "text",
            "data-slot": "expandable-search-input",
            className: "h-full w-full min-w-0 border-none bg-transparent pr-3 text-sm outline-none placeholder:text-muted-foreground",
            value: e,
            onChange: (t) => n == null ? void 0 : n(t.target.value),
            onFocus: u,
            onBlur: f,
            placeholder: s
          }
        )
      ]
    }
  );
}
export {
  y as ExpandableSearch
};
//# sourceMappingURL=ExpandableSearch.js.map
