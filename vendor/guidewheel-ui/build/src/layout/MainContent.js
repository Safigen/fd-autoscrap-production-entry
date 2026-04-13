import { jsx as t } from "react/jsx-runtime";
import { cva as p } from "class-variance-authority";
import { cn as e } from "../utils/cn.js";
import { Box as m } from "./Box.js";
const i = p("rounded-lg border bg-card p-4", {
  variants: {
    variant: {
      page: "h-full w-full p-6 pb-9 shadow-2xl",
      panel: "p-10 shadow-panel"
    }
  }
});
function f({
  className: o,
  children: a,
  variant: n = "page",
  ...r
}) {
  return /* @__PURE__ */ t(
    m,
    {
      "data-slot": "main-content",
      className: e(i({ variant: n }), o),
      ...r,
      children: a
    }
  );
}
export {
  f as MainContent
};
//# sourceMappingURL=MainContent.js.map
