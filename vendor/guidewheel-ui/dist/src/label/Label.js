import { jsx as r } from "react/jsx-runtime";
import { Root as o } from "../../node_modules/@radix-ui/react-label/dist/index.js";
import { cva as l } from "../../node_modules/class-variance-authority/dist/index.js";
import { cn as n } from "../utils/cn.js";
const s = l(
  [
    "flex select-none items-center gap-2 leading-none",
    "peer-disabled:cursor-not-allowed peer-disabled:text-pale-foreground",
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:text-pale-foreground"
  ],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function u({
  className: e,
  size: t = "md",
  ...a
}) {
  return /* @__PURE__ */ r(
    o,
    {
      "data-slot": "label",
      className: n(s({ size: t }), e),
      ...a
    }
  );
}
export {
  u as Label
};
//# sourceMappingURL=Label.js.map
