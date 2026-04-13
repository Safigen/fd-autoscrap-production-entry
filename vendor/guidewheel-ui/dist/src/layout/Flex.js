import { jsx as r } from "react/jsx-runtime";
import { Root as l } from "../../node_modules/@radix-ui/react-slot/dist/index.js";
import { cva as m } from "../../node_modules/class-variance-authority/dist/index.js";
import { cn as a } from "../utils/cn.js";
import { spacingLength as f } from "../utils/tw3-compat.js";
const p = m("flex gap-[var(--gap)]", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col"
    }
  }
});
function t({
  asChild: o,
  className: n,
  direction: i = "row",
  spacing: e = 0,
  ...c
}) {
  return /* @__PURE__ */ r(
    o ? l : "div",
    {
      style: { "--gap": f(e) },
      className: a(p({ direction: i }), n),
      ...c
    }
  );
}
function v({ ...o }) {
  return /* @__PURE__ */ r(t, { direction: "row", ...o });
}
function C({ ...o }) {
  return /* @__PURE__ */ r(t, { direction: "col", ...o });
}
export {
  t as Flex,
  C as FlexColumn,
  v as FlexRow
};
//# sourceMappingURL=Flex.js.map
