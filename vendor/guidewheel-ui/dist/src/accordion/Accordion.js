import { jsx as o, jsxs as a } from "react/jsx-runtime";
import { Root as i, Content as c, Item as s, Header as d, Trigger as m } from "../../node_modules/@radix-ui/react-accordion/dist/index.js";
import l from "../icons/ChevronDownIcon.js";
import { cn as r } from "../utils/cn.js";
function x({
  ...t
}) {
  return /* @__PURE__ */ o(i, { "data-slot": "accordion", ...t });
}
function h({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "accordion-item",
      className: r("border-b", t),
      ...e
    }
  );
}
function N({
  className: t,
  children: e,
  ...n
}) {
  return /* @__PURE__ */ o(d, { className: "flex", children: /* @__PURE__ */ a(
    m,
    {
      "data-slot": "accordion-trigger",
      className: r(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline",
        "[&[data-state=open]>svg]:rotate-180",
        t
      ),
      ...n,
      children: [
        e,
        /* @__PURE__ */ o(l, { className: "size-4 shrink-0 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function v({
  className: t,
  children: e,
  ...n
}) {
  return /* @__PURE__ */ o(
    c,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...n,
      children: /* @__PURE__ */ o("div", { className: r("pb-4 pt-0", t), children: e })
    }
  );
}
export {
  x as Accordion,
  v as AccordionContent,
  h as AccordionItem,
  N as AccordionTrigger
};
//# sourceMappingURL=Accordion.js.map
