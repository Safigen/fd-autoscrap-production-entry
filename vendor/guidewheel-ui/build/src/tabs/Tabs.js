import { jsx as r } from "react/jsx-runtime";
import { Root as o, Content as s, List as n, Trigger as a } from "../../node_modules/@radix-ui/react-tabs/dist/index.js";
import { cn as i } from "../utils/cn.js";
function l({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    o,
    {
      "data-slot": "tabs",
      className: i(t),
      ...e
    }
  );
}
function u({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    n,
    {
      "data-slot": "tabs-list",
      className: i(
        "flex items-center gap-1 border-b border-border",
        t
      ),
      ...e
    }
  );
}
function d({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    a,
    {
      "data-slot": "tabs-trigger",
      className: i(
        "inline-flex min-h-[44px] items-center justify-center px-4 py-2",
        "text-sm font-medium text-muted-foreground",
        "border-b-2 border-transparent",
        "hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:border-primary data-[state=active]:text-foreground",
        "-mb-px",
        t
      ),
      ...e
    }
  );
}
function m({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    s,
    {
      "data-slot": "tabs-content",
      className: i(
        "pt-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        t
      ),
      ...e
    }
  );
}
export {
  l as Tabs,
  m as TabsContent,
  u as TabsList,
  d as TabsTrigger
};
//# sourceMappingURL=Tabs.js.map
