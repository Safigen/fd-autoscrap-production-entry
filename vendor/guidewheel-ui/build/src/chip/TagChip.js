import { jsxs as o, jsx as n } from "react/jsx-runtime";
import { Chip as t } from "./Chip.js";
function s({ children: e, color: r, ...i }) {
  return /* @__PURE__ */ o(t, { ...i, children: [
    r && /* @__PURE__ */ n(
      "div",
      {
        className: "h-2 w-2 rounded-full",
        role: "presentation",
        "aria-hidden": "true",
        style: { backgroundColor: r }
      }
    ),
    e
  ] });
}
export {
  s as TagChip
};
//# sourceMappingURL=TagChip.js.map
