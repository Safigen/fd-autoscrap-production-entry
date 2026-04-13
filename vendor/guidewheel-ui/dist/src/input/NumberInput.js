import { jsx as e } from "react/jsx-runtime";
import { cn as r } from "../utils/cn.js";
import { Input as p } from "./Input.js";
function a({ className: n, ...t }) {
  return /* @__PURE__ */ e(
    p,
    {
      type: "number",
      "data-slot": "number-input",
      className: r(
        "[appearance:textfield]",
        "[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none",
        "[&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
        n
      ),
      ...t
    }
  );
}
export {
  a as NumberInput
};
//# sourceMappingURL=NumberInput.js.map
