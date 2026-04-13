import { jsx as e, jsxs as n } from "react/jsx-runtime";
import * as u from "react";
import { Button as c } from "../button/Button.js";
import p from "../icons/CalendarIcon.js";
import { Popover as x, PopoverTrigger as g, PopoverContent as h } from "../popover/Popover.js";
import { cn as a } from "../utils/cn.js";
import { DayPicker as y } from "../../node_modules/react-day-picker/dist/esm/DayPicker.js";
function _({
  selected: t,
  onSelect: r,
  placeholder: i = "Pick a date",
  disabled: s = !1,
  className: m
}) {
  const [f, o] = u.useState(!1);
  function l(d) {
    r == null || r(d), o(!1);
  }
  return /* @__PURE__ */ e(x, { open: f, onOpenChange: o, children: /* @__PURE__ */ n("div", { "data-slot": "date-picker", className: a(m), children: [
    /* @__PURE__ */ e(g, { asChild: !0, children: /* @__PURE__ */ n(
      c,
      {
        variant: "solid",
        color: "default",
        disabled: s,
        className: a(
          "justify-start text-left font-normal",
          !t && "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ e(p, {}),
          /* @__PURE__ */ e("span", { children: t ? t.toLocaleDateString() : i })
        ]
      }
    ) }),
    /* @__PURE__ */ e(h, { className: "w-auto p-3", align: "start", children: /* @__PURE__ */ e(
      y,
      {
        mode: "single",
        selected: t,
        onSelect: l,
        classNames: {
          root: "text-foreground",
          months: "flex flex-col",
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
          today: "font-bold",
          outside: "text-muted-foreground opacity-50",
          disabled: "text-muted-foreground opacity-50"
        }
      }
    ) })
  ] }) });
}
export {
  _ as DatePicker
};
//# sourceMappingURL=DatePicker.js.map
