import { jsx as l, jsxs as c, Fragment as _ } from "react/jsx-runtime";
import D from "../icons/DeviceIcon.js";
import { Select as G, SelectTrigger as L, SelectValue as N, SelectContent as C, SelectItem as t, SelectSeparator as d, SelectGroup as o, SelectLabel as m } from "../select/Select.js";
import { cn as b } from "../utils/cn.js";
const n = "__all__";
function E({
  devices: h,
  selectedId: a,
  onSelect: u,
  showGroups: p = !1,
  groups: r = [],
  placeholder: v = "Device",
  showAllOption: i = !0,
  allOptionLabel: S = "All devices",
  disabled: f = !1,
  className: g
}) {
  const x = (e) => {
    u(e === n ? "" : e);
  }, V = a || n, s = p && r.length > 0;
  return /* @__PURE__ */ l("div", { "data-slot": "device-select", className: b("inline-block", g), children: /* @__PURE__ */ c(
    G,
    {
      value: V,
      onValueChange: x,
      disabled: f,
      children: [
        /* @__PURE__ */ l(
          L,
          {
            "data-slot": "device-select-trigger",
            className: "min-w-[180px]",
            children: /* @__PURE__ */ c("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ l(D, { size: "sm", className: "shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ l(N, { placeholder: v })
            ] })
          }
        ),
        /* @__PURE__ */ c(C, { "data-slot": "device-select-content", children: [
          i && /* @__PURE__ */ l(t, { value: n, children: S }),
          s && /* @__PURE__ */ c(_, { children: [
            i && /* @__PURE__ */ l(d, {}),
            /* @__PURE__ */ c(o, { children: [
              /* @__PURE__ */ l(m, { children: "Groups" }),
              r.map((e) => /* @__PURE__ */ c(t, { value: e.id, children: [
                "Group: ",
                e.name
              ] }, `group-${e.id}`))
            ] }),
            /* @__PURE__ */ l(d, {})
          ] }),
          /* @__PURE__ */ c(o, { children: [
            s && /* @__PURE__ */ l(m, { children: "Devices" }),
            h.map((e) => /* @__PURE__ */ l(t, { value: e.id, children: e.name }, e.id))
          ] })
        ] })
      ]
    }
  ) });
}
export {
  E as DeviceSelect
};
//# sourceMappingURL=DeviceSelect.js.map
