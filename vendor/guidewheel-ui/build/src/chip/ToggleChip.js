import { jsx as a } from "react/jsx-runtime";
import { cva as e } from "class-variance-authority";
import { cn as n } from "../utils/cn.js";
import { Chip as p } from "./Chip.js";
const i = e([
  "group/toggle-chip",
  "border border-brand-grey-800",
  "data-[state=on]:border-primary data-[state=on]:bg-btn-pressed data-[state=on]:text-btn-primary"
]);
function b({ pressed: t, className: r, ...o }) {
  return /* @__PURE__ */ a(
    p,
    {
      "data-state": t ? "on" : "off",
      className: n(i(), r),
      ...o
    }
  );
}
export {
  b as ToggleChip
};
//# sourceMappingURL=ToggleChip.js.map
