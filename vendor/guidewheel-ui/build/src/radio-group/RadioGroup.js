import { jsx as o } from "react/jsx-runtime";
import { Root as a, Item as t, Indicator as s } from "@radix-ui/react-radio-group";
import { cn as i } from "../utils/cn.js";
function u({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "radio-group",
      className: i("flex flex-col gap-2", r),
      ...e
    }
  );
}
function c({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ o(
    t,
    {
      "data-slot": "radio-group-item",
      className: i(
        "aspect-square h-4 w-4 rounded-full border border-input ring-offset-background",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        r
      ),
      ...e,
      children: /* @__PURE__ */ o(
        s,
        {
          "data-slot": "radio-group-indicator",
          className: "flex items-center justify-center",
          children: /* @__PURE__ */ o("span", { className: "size-2.5 rounded-full bg-primary" })
        }
      )
    }
  );
}
export {
  u as RadioGroup,
  c as RadioGroupItem
};
//# sourceMappingURL=RadioGroup.js.map
