import { jsx as t } from "react/jsx-runtime";
import { cva as n } from "class-variance-authority";
import { cn as c } from "../../utils/cn.js";
const i = n("flex flex-col rounded", {
  variants: {
    size: {
      md: "gap-2 p-3",
      lg: "gap-3 p-4",
      xl: "gap-4 p-6"
    },
    color: {
      default: "border bg-card",
      danger: "border border-card-danger-border bg-card-danger"
    }
  },
  defaultVariants: {
    size: "md",
    color: "default"
  }
});
function s({
  className: r,
  children: a,
  size: e,
  color: o,
  ...d
}) {
  return /* @__PURE__ */ t("div", { className: c(i({ size: e, color: o }), r), ...d, children: a });
}
export {
  s as PageSection
};
//# sourceMappingURL=PageSection.js.map
