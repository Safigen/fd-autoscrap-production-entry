import { jsx as i } from "react/jsx-runtime";
import { Root as n } from "../../node_modules/@radix-ui/react-separator/dist/index.js";
import { cn as e } from "../utils/cn.js";
function f({
  className: t,
  orientation: o = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ i(
    n,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: o,
      className: e(
        [
          "shrink-0 bg-border",
          "data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full",
          "data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
        ],
        t
      ),
      ...r
    }
  );
}
export {
  f as default
};
//# sourceMappingURL=Separator.js.map
