import { jsx as a } from "react/jsx-runtime";
import { cn as e } from "../utils/cn.js";
function n({ className: t, ...r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card",
      className: e(
        "bg-card text-card-foreground rounded-lg border shadow-sm",
        t
      ),
      ...r
    }
  );
}
function c({ className: t, ...r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-header",
      className: e("flex flex-col gap-1.5 p-6", t),
      ...r
    }
  );
}
function s({ className: t, ...r }) {
  return /* @__PURE__ */ a(
    "h3",
    {
      "data-slot": "card-title",
      className: e("text-lg font-semibold leading-none", t),
      ...r
    }
  );
}
function l({ className: t, ...r }) {
  return /* @__PURE__ */ a(
    "p",
    {
      "data-slot": "card-description",
      className: e("text-sm text-muted-foreground", t),
      ...r
    }
  );
}
function i({ className: t, ...r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-content",
      className: e("p-6 pt-0", t),
      ...r
    }
  );
}
function u({ className: t, ...r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-footer",
      className: e("flex items-center p-6 pt-0", t),
      ...r
    }
  );
}
export {
  n as Card,
  i as CardContent,
  l as CardDescription,
  u as CardFooter,
  c as CardHeader,
  s as CardTitle
};
//# sourceMappingURL=Card.js.map
