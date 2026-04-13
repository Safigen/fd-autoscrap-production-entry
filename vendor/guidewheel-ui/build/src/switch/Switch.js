import { jsx as e } from "react/jsx-runtime";
import { Root as n, Thumb as o } from "../../node_modules/@radix-ui/react-switch/dist/index.js";
import { cva as s } from "../../node_modules/class-variance-authority/dist/index.js";
import { cn as a } from "../utils/cn.js";
const c = s(
  [
    "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center p-0",
    "rounded-full border border-transparent outline-none",
    "transition-all",
    "focus-visible:outline-none focus-visible:ring-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
  ],
  {
    variants: {
      size: {
        sm: "h-[0.86rem] w-6",
        md: "h-[1.15rem] w-8",
        lg: "h-[1.44rem] w-10"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
), d = s(
  [
    "pointer-events-none block size-4 rounded-full bg-background ring-0",
    "transition-transform",
    "data-[state=checked]:translate-x-[calc(100%-2px)]",
    "data-[state=unchecked]:translate-x-0"
  ],
  {
    variants: {
      size: {
        sm: "size-3",
        md: "size-4",
        lg: "size-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function b({
  className: r,
  size: t = "md",
  ...i
}) {
  return /* @__PURE__ */ e(
    n,
    {
      "data-slot": "switch",
      className: a(c({ size: t }), r),
      ...i,
      children: /* @__PURE__ */ e(
        o,
        {
          "data-slot": "switch-thumb",
          className: a(d({ size: t }))
        }
      )
    }
  );
}
export {
  b as Switch
};
//# sourceMappingURL=Switch.js.map
