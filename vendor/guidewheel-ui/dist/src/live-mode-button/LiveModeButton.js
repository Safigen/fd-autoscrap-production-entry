import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { cn as n } from "../utils/cn.js";
function h({
  enabled: t = !1,
  onToggle: a,
  showLabel: o = !0,
  showProgress: s = !1,
  progress: i = 0,
  className: l
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      "data-slot": "live-mode-button",
      onClick: a,
      className: n(
        "inline-flex h-[44px] min-w-[44px] items-center gap-1.5 rounded border px-2 text-sm font-normal",
        "transition-colors",
        t ? "border-brand-primary-500 bg-brand-primary-100 text-brand-primary-500" : "border-brand-grey-400 bg-white text-brand-grey-800",
        l
      ),
      children: [
        /* @__PURE__ */ r("span", { className: "relative flex shrink-0 items-center justify-center", children: [
          /* @__PURE__ */ r(
            "svg",
            {
              className: n(
                "h-5 w-5",
                t ? "text-green-600 animate-[live-pulse_1s_infinite]" : "text-red-500"
              ),
              viewBox: "0 0 24 24",
              fill: "currentColor",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "4" }),
                /* @__PURE__ */ e(
                  "path",
                  {
                    d: "M7.05 7.05a7 7 0 0 0 0 9.9M16.95 7.05a7 7 0 0 1 0 9.9M4.22 4.22a11 11 0 0 0 0 15.56M19.78 4.22a11 11 0 0 1 0 15.56",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                  }
                )
              ]
            }
          ),
          s && t && /* @__PURE__ */ r(
            "svg",
            {
              className: "absolute",
              width: "30",
              height: "30",
              viewBox: "0 0 30 30",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ e(
                  "circle",
                  {
                    cx: "15",
                    cy: "15",
                    r: "12",
                    strokeWidth: "3",
                    fill: "none",
                    stroke: "#e0e0e0"
                  }
                ),
                /* @__PURE__ */ e(
                  "circle",
                  {
                    cx: "15",
                    cy: "15",
                    r: "12",
                    strokeWidth: "3",
                    fill: "none",
                    stroke: "var(--color-brand-primary-300, #93c5fd)",
                    strokeLinecap: "round",
                    strokeDasharray: `${i * 75.4 / 100} ${75.4 - i * 75.4 / 100}`,
                    transform: "rotate(-90 15 15)",
                    style: { transition: "stroke-dasharray 0.3s linear" }
                  }
                )
              ]
            }
          )
        ] }),
        o && /* @__PURE__ */ e("span", { className: "hidden xl:inline", children: "Live View" })
      ]
    }
  );
}
export {
  h as LiveModeButton
};
//# sourceMappingURL=LiveModeButton.js.map
