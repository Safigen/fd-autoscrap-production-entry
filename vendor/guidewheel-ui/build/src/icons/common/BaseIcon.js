import { jsx as a } from "react/jsx-runtime";
import { cn as n } from "../../utils/cn.js";
import { useIconContext as f } from "./IconContext.js";
import { iconVariants as m } from "./variants.js";
function l({ className: o, size: r, children: s, ...t }) {
  const e = f(), i = r ?? (e == null ? void 0 : e.size) ?? "md";
  return /* @__PURE__ */ a(
    "svg",
    {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      focusable: "false",
      className: n(m({ size: i }), o),
      ...t,
      children: s
    }
  );
}
export {
  l as default
};
//# sourceMappingURL=BaseIcon.js.map
