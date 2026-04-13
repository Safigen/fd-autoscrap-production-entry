import { jsx as p } from "react/jsx-runtime";
import { cn as a } from "../utils/cn.js";
import { chipVariants as m } from "./common/variants.js";
function f({ children: r, className: o, size: t, ...i }) {
  return /* @__PURE__ */ p(
    "span",
    {
      "data-slot": "chip",
      className: a(m({ size: t }), o),
      ...i,
      children: r
    }
  );
}
export {
  f as Chip
};
//# sourceMappingURL=Chip.js.map
