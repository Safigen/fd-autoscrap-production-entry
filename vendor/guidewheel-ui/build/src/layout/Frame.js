import { jsx as e } from "react/jsx-runtime";
import { cva as t } from "../../node_modules/class-variance-authority/dist/index.js";
import { cn as m } from "../utils/cn.js";
import { Box as n } from "./Box.js";
const c = t("rounded border p-3", {
  variants: {
    color: {
      default: "border bg-card",
      muted: "border-muted bg-card",
      danger: "border-card-danger-border bg-card-danger"
    }
  },
  defaultVariants: {
    color: "default"
  }
});
function s({
  className: r,
  children: o,
  color: a,
  ...d
}) {
  return /* @__PURE__ */ e(n, { className: m(c({ color: a }), r), ...d, children: o });
}
export {
  s as Frame
};
//# sourceMappingURL=Frame.js.map
