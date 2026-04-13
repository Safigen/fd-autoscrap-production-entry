import { jsxs as i, jsx as e } from "react/jsx-runtime";
import c from "../icons/CloseIcon.js";
import l from "../icons/SearchIcon.js";
import { Input as m } from "../input/Input.js";
import { cn as s } from "../utils/cn.js";
function x({
  className: n,
  value: t,
  onClear: r,
  ...a
}) {
  const o = t !== void 0 && t !== "" && r;
  return /* @__PURE__ */ i("div", { "data-slot": "search-input", className: s("relative", n), children: [
    /* @__PURE__ */ e("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted-foreground", children: /* @__PURE__ */ e(l, { size: "sm" }) }),
    /* @__PURE__ */ e(
      m,
      {
        type: "text",
        value: t,
        className: s("pl-9", o && "pr-9"),
        ...a
      }
    ),
    o && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "data-slot": "search-input-clear",
        onClick: r,
        "aria-label": "Clear search",
        className: "absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground hover:text-foreground",
        children: /* @__PURE__ */ e(c, { size: "sm" })
      }
    )
  ] });
}
export {
  x as SearchInput
};
//# sourceMappingURL=SearchInput.js.map
