import { jsx as r } from "react/jsx-runtime";
import { Portal as o } from "@radix-ui/react-portal";
import { cva as a } from "class-variance-authority";
import { Toaster as c } from "sonner";
import n from "../icons/CancelIcon.js";
import i from "../icons/CheckIcon.js";
import m from "../icons/CloseIcon.js";
import { cn as e } from "../utils/cn.js";
const s = a("group", {
  variants: {
    variant: {
      success: "border-success-700 bg-success-100 text-success-900",
      error: "border-danger-700 bg-danger-100 text-danger-900"
    }
  }
}), h = ({ ...t }) => /* @__PURE__ */ r(o, { children: /* @__PURE__ */ r(
  c,
  {
    position: "top-center",
    closeButton: !0,
    icons: {
      success: /* @__PURE__ */ r("span", { className: "flex size-5 items-center justify-center rounded-full bg-success-700", children: /* @__PURE__ */ r(i, { className: "size-3 text-background" }) }),
      error: /* @__PURE__ */ r(n, { className: "size-5 text-danger-700" }),
      close: /* @__PURE__ */ r(m, { className: "size-5 text-muted-foreground" })
    },
    toastOptions: {
      unstyled: !0,
      classNames: {
        toast: e(
          "flex min-w-[300px] items-center gap-2 rounded border p-4 shadow-lg"
        ),
        title: e("mr-2"),
        success: e(s({ variant: "success" })),
        error: e(s({ variant: "error" })),
        closeButton: e(
          "static order-last ml-auto w-5 max-w-5 shrink-0 cursor-pointer",
          "bg-transparent p-0"
        )
      }
    },
    ...t
  }
) });
export {
  h as Toaster
};
//# sourceMappingURL=Toaster.js.map
