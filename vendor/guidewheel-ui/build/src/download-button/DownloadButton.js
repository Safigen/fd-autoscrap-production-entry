import { jsxs as m, jsx as e } from "react/jsx-runtime";
import * as o from "react";
import b from "../icons/DownloadIcon.js";
import f from "../icons/LoadingIcon.js";
import { cn as p } from "../utils/cn.js";
function N({
  onDownloadCsv: a,
  onDownloadExcel: i,
  loading: d = !1,
  tooltip: l = "Download data",
  className: c
}) {
  const [t, r] = o.useState(!1), s = o.useRef(null);
  return o.useEffect(() => {
    if (!t) return;
    function n(u) {
      s.current && !s.current.contains(u.target) && r(!1);
    }
    return document.addEventListener("mousedown", n), () => document.removeEventListener("mousedown", n);
  }, [t]), /* @__PURE__ */ m(
    "div",
    {
      ref: s,
      className: "relative inline-block",
      "data-slot": "download-button",
      children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            disabled: d,
            onClick: () => r((n) => !n),
            title: l,
            "aria-label": l,
            "aria-expanded": t,
            "aria-haspopup": "menu",
            className: p(
              "inline-flex h-[44px] w-[45px] items-center justify-center rounded border border-brand-grey-400 bg-white",
              "transition-colors hover:bg-gray-50",
              "disabled:pointer-events-none disabled:opacity-50",
              c
            ),
            children: d ? /* @__PURE__ */ e(f, { size: "sm", className: "animate-spin" }) : /* @__PURE__ */ e(b, { size: "md", className: "text-brand-grey-800" })
          }
        ),
        t && /* @__PURE__ */ m(
          "div",
          {
            role: "menu",
            className: "absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded border border-border bg-white shadow-md",
            children: [
              /* @__PURE__ */ e("div", { className: "px-3 py-1.5 text-xs font-medium text-muted-foreground", children: "Table data" }),
              /* @__PURE__ */ e("div", { className: "h-px bg-border" }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  className: "flex w-full items-center px-3 py-2 text-sm hover:bg-accent",
                  onClick: () => {
                    a == null || a(), r(!1);
                  },
                  children: "CSV"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  className: "flex w-full items-center px-3 py-2 text-sm hover:bg-accent",
                  onClick: () => {
                    i == null || i(), r(!1);
                  },
                  children: "Excel"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  N as DownloadButton
};
//# sourceMappingURL=DownloadButton.js.map
