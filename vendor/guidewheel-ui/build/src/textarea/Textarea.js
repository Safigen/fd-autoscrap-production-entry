import { jsx as o } from "react/jsx-runtime";
import { cn as i } from "../utils/cn.js";
function a({ className: e, ...r }) {
  return /* @__PURE__ */ o(
    "textarea",
    {
      "data-slot": "textarea",
      className: i(
        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "ring-offset-background",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "min-h-20 resize-y",
        e
      ),
      ...r
    }
  );
}
export {
  a as Textarea
};
//# sourceMappingURL=Textarea.js.map
