import { jsx as e, jsxs as r, Fragment as m } from "react/jsx-runtime";
import { useMemo as u } from "react";
import { cva as p } from "class-variance-authority";
import g from "../icons/CancelIcon.js";
import { Label as x } from "../label/Label.js";
import h from "../separator/Separator.js";
import { cn as d } from "../utils/cn.js";
function L({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "fieldset",
    {
      "data-slot": "field-set",
      className: d(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        t
      ),
      ...a
    }
  );
}
function S({
  className: t,
  variant: a = "legend",
  ...l
}) {
  return /* @__PURE__ */ e(
    "legend",
    {
      "data-slot": "field-legend",
      "data-variant": a,
      className: d(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        t
      ),
      ...l
    }
  );
}
function j({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "field-group",
      className: d(
        "group/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        t
      ),
      ...a
    }
  );
}
const b = p(
  [
    "group/field flex w-full gap-1",
    // Guidewheel UI specific styles
    "text-sm"
  ],
  {
    variants: {
      orientation: {
        vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
        horizontal: "has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px flex-row items-center gap-3 has-[>[data-slot=field-content]]:items-start [&>[data-slot=field-label]]:flex-auto"
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function C({
  className: t,
  orientation: a = "vertical",
  ...l
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": a,
      className: d(b({ orientation: a }), t),
      ...l
    }
  );
}
function M({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "field-content",
      className: d(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        t
      ),
      ...a
    }
  );
}
function V({
  className: t,
  size: a = "sm",
  ...l
}) {
  return /* @__PURE__ */ e(
    x,
    {
      "data-slot": "field-label",
      className: d(
        "has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border group-data-[disabled=true]/field:opacity-50 [&>*]:data-[slot=field]:p-2.5",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        // Guidewheel UI specific styles: Label should always be text-foreground (not danger colored on error)
        "font-medium text-foreground",
        t
      ),
      size: a,
      ...l
    }
  );
}
function D({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "field-label",
      className: d(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug group-data-[disabled=true]/field:opacity-50",
        t
      ),
      ...a
    }
  );
}
function G({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "p",
    {
      "data-slot": "field-description",
      className: d(
        "text-left text-sm font-normal leading-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "nth-last-2:-mt-1 last:mt-0",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        t
      ),
      ...a
    }
  );
}
function I({
  children: t,
  className: a,
  ...l
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "field-separator",
      "data-content": !!t,
      className: d(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        a
      ),
      ...l,
      children: [
        /* @__PURE__ */ e(h, { className: "absolute inset-0 top-1/2" }),
        t && /* @__PURE__ */ e(
          "span",
          {
            className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
            "data-slot": "field-separator-content",
            children: t
          }
        )
      ]
    }
  );
}
function T({
  className: t,
  children: a,
  errors: l,
  ...f
}) {
  const n = u(() => {
    var s;
    if (a)
      return /* @__PURE__ */ r(m, { children: [
        /* @__PURE__ */ e(g, { size: "xs" }),
        a
      ] });
    if (!(l != null && l.length))
      return null;
    const o = [
      ...new Map(l.map((i) => [i == null ? void 0 : i.message, i])).values()
    ];
    return (o == null ? void 0 : o.length) == 1 ? (s = o[0]) == null ? void 0 : s.message : /* @__PURE__ */ e("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: o.map(
      (i, c) => (
        /* shadcn-vendored source violates app linting rules */
        /* eslint-disable-next-line react/no-array-index-key */
        (i == null ? void 0 : i.message) && /* @__PURE__ */ e("li", { children: i.message }, c)
      )
    ) });
  }, [a, l]);
  return n ? /* @__PURE__ */ e(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: d("text-sm font-normal text-danger", t),
      ...f,
      children: /* @__PURE__ */ e("div", { className: "flex items-center gap-1", children: n })
    }
  ) : null;
}
export {
  C as Field,
  M as FieldContent,
  G as FieldDescription,
  T as FieldError,
  j as FieldGroup,
  V as FieldLabel,
  S as FieldLegend,
  I as FieldSeparator,
  L as FieldSet,
  D as FieldTitle
};
//# sourceMappingURL=Field.js.map
