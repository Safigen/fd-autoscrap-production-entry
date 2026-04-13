import { jsx as e, jsxs as n } from "react/jsx-runtime";
import * as u from "react";
import { Button as p } from "../button/Button.js";
import x from "../icons/CalendarIcon.js";
import { Popover as y, PopoverTrigger as h, PopoverContent as b } from "../popover/Popover.js";
import { cn as i } from "../utils/cn.js";
import { DayPicker as v } from "../../node_modules/react-day-picker/dist/esm/DayPicker.js";
const w = {
  root: "text-foreground",
  months: "flex gap-4",
  month: "space-y-4",
  month_caption: "flex justify-center pt-1 relative items-center",
  caption_label: "text-sm font-medium",
  nav: "flex items-center gap-1",
  button_previous: "inline-flex items-center justify-center rounded-sm h-7 w-7 bg-transparent hover:bg-surface text-foreground",
  button_next: "inline-flex items-center justify-center rounded-sm h-7 w-7 bg-transparent hover:bg-surface text-foreground",
  month_grid: "w-full border-collapse space-y-1",
  weekdays: "flex",
  weekday: "text-muted-foreground rounded-sm w-9 font-normal text-[0.8rem]",
  week: "flex w-full mt-2",
  day: "h-9 w-9 text-center text-sm relative flex items-center justify-center rounded-sm hover:bg-surface",
  day_button: "h-9 w-9 p-0 font-normal inline-flex items-center justify-center",
  selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
  range_start: "rounded-r-none",
  range_end: "rounded-l-none",
  range_middle: "bg-primary/20 text-foreground rounded-none",
  today: "font-bold",
  outside: "text-muted-foreground opacity-50",
  disabled: "text-muted-foreground opacity-50"
};
function _(t) {
  return t.from && t.to ? `${t.from.toLocaleDateString()} – ${t.to.toLocaleDateString()}` : t.from ? t.from.toLocaleDateString() : "";
}
function N({
  range: t,
  onRangeChange: o,
  placeholder: m = "Pick a date range",
  disabled: f = !1,
  className: d
}) {
  const [s, a] = u.useState(!1), l = t != null && t.from ? _(t) : m;
  function c(r) {
    o == null || o(
      r ? { from: r.from, to: r.to } : void 0
    );
  }
  return /* @__PURE__ */ e(y, { open: s, onOpenChange: a, children: /* @__PURE__ */ n("div", { "data-slot": "date-range-picker", className: i(d), children: [
    /* @__PURE__ */ e(h, { asChild: !0, children: /* @__PURE__ */ n(
      p,
      {
        variant: "solid",
        color: "default",
        disabled: f,
        className: i(
          "justify-start text-left font-normal",
          !(t != null && t.from) && "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ e(x, {}),
          /* @__PURE__ */ e("span", { children: l })
        ]
      }
    ) }),
    /* @__PURE__ */ e(b, { className: "w-auto p-3", align: "start", children: /* @__PURE__ */ e(
      v,
      {
        mode: "range",
        selected: t != null && t.from ? { from: t.from, to: t.to } : void 0,
        onSelect: c,
        numberOfMonths: 2,
        classNames: w
      }
    ) })
  ] }) });
}
export {
  N as DateRangePicker
};
//# sourceMappingURL=DateRangePicker.js.map
