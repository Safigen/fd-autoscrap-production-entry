import { jsx as a } from "react/jsx-runtime";
import { cn as o } from "../utils/cn.js";
function m({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-state",
      className: o(
        "flex flex-col items-center justify-center gap-4 py-12 text-center",
        t
      ),
      ...e
    }
  );
}
function r({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-state-icon",
      className: o("text-muted-foreground", t),
      ...e
    }
  );
}
function i({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    "h3",
    {
      "data-slot": "empty-state-title",
      className: o("text-lg font-semibold text-foreground", t),
      ...e
    }
  );
}
function c({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    "p",
    {
      "data-slot": "empty-state-description",
      className: o("text-sm text-muted-foreground max-w-sm", t),
      ...e
    }
  );
}
function p({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-state-action",
      className: o(t),
      ...e
    }
  );
}
export {
  m as EmptyState,
  p as EmptyStateAction,
  c as EmptyStateDescription,
  r as EmptyStateIcon,
  i as EmptyStateTitle
};
//# sourceMappingURL=EmptyState.js.map
