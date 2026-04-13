import { jsx as m } from "react/jsx-runtime";
import { Root as n } from "../../node_modules/@radix-ui/react-slot/dist/index.js";
import { cn as i } from "../utils/cn.js";
import { linkVariants as a } from "./common/variants.js";
function e({
  asChild: o,
  className: t,
  ...r
}) {
  return /* @__PURE__ */ m(
    o ? n : "a",
    {
      "data-slot": "link",
      className: i(o ? "" : a(), t),
      ...r
    }
  );
}
export {
  e as Link
};
//# sourceMappingURL=Link.js.map
