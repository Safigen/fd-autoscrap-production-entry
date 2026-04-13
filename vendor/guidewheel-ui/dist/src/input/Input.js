import { jsx as n } from "react/jsx-runtime";
import { cn as i } from "../utils/cn.js";
function a({ className: o, type: e, ...t }) {
  return /* @__PURE__ */ n(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: i(
        "h-9 w-full min-w-0 rounded border-none bg-transparent px-3 py-1",
        // This should use Tailwind's `outline` class instead of the
        // arbitrary [outline-style:solid] but there is an incompatibility with
        // our current version of tailwind-merge (3.3.1) combined with TW 3
        // incorrectly removes the outline class when `outline-1` is present.
        // Future fix: Upgrade Tailwind to v4+ or downgrade tailwind-merge.
        // See https://github.com/dcastil/tailwind-merge/issues/555
        "outline-1 outline-offset-[-1px] outline-input [outline-style:solid]",
        "focus:outline-2 focus:outline-primary",
        "text-base transition-[color,box-shadow]",
        "selection:bg-primary selection:text-primary-foreground",
        "placeholder:text-muted-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid]:outline-2 aria-[invalid]:outline-danger",
        o
      ),
      ...t
    }
  );
}
export {
  a as Input
};
//# sourceMappingURL=Input.js.map
