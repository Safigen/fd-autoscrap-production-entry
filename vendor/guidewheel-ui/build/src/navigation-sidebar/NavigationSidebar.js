import { jsxs as a, jsx as e } from "react/jsx-runtime";
import * as N from "react";
import { GuidewheelCircle as y } from "../assets/logos/GuidewheelCircle.js";
import { GuidewheelLogo as j } from "../assets/logos/GuidewheelLogo.js";
import { Tooltip as d, TooltipTrigger as h, TooltipContent as u } from "../tooltip/Tooltip.js";
import { cn as c } from "../utils/cn.js";
function z({
  item: t,
  collapsed: r,
  onItemClick: i
}) {
  const n = /* @__PURE__ */ a(
    "button",
    {
      "data-slot": "navigation-sidebar-item",
      "data-active": t.active || void 0,
      className: c(
        "flex w-full items-center gap-2 rounded px-3 py-1.5 text-sm font-medium",
        "transition-colors",
        "min-h-9",
        t.active ? "text-brand-secondary-500" : "text-brand-grey-800 hover:bg-white/[0.08]",
        r && "justify-center px-0"
      ),
      onClick: () => i == null ? void 0 : i(t),
      children: [
        t.icon && /* @__PURE__ */ e("span", { className: "flex shrink-0 items-center justify-center size-[18px]", children: t.icon }),
        !r && /* @__PURE__ */ e("span", { className: "truncate", children: t.label })
      ]
    }
  );
  return r ? /* @__PURE__ */ a(d, { children: [
    /* @__PURE__ */ e(h, { asChild: !0, children: n }),
    /* @__PURE__ */ e(u, { side: "right", children: t.label })
  ] }) : n;
}
function O({
  items: t,
  collapsed: r = !1,
  onToggleCollapse: i,
  onItemClick: n,
  logo: s,
  companyName: l,
  username: o,
  onLogout: f,
  helpCenterUrl: x = "https://support.guidewheel.app",
  collapseIcon: p,
  expandIcon: b,
  helpIcon: g,
  userIcon: v,
  className: w
}) {
  return /* @__PURE__ */ a(
    "aside",
    {
      "data-slot": "navigation-sidebar",
      "data-collapsed": r || void 0,
      className: c(
        "relative flex flex-col h-full bg-card pt-1",
        "transition-all duration-200",
        r ? "w-14" : "w-[150px]",
        w
      ),
      children: [
        /* @__PURE__ */ e(
          "button",
          {
            "data-slot": "navigation-sidebar-edge-toggle",
            className: c(
              "absolute top-0 -right-2 z-10 w-2 h-full",
              "bg-transparent transition-colors",
              "hover:bg-[rgba(241,194,50,0.3)] focus:bg-[rgba(241,194,50,0.4)]",
              r ? "cursor-e-resize" : "cursor-w-resize"
            ),
            onClick: i,
            "aria-label": r ? "Expand sidebar" : "Collapse sidebar"
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            "data-slot": "navigation-sidebar-header",
            className: c(
              "flex items-center px-3 py-2",
              r ? "justify-center" : "px-4"
            ),
            children: s ?? (r ? /* @__PURE__ */ e(y, { className: "size-8", "aria-label": "Guidewheel" }) : /* @__PURE__ */ e(j, { className: "h-10 w-auto", "aria-label": "Guidewheel" }))
          }
        ),
        l && !r && /* @__PURE__ */ e("div", { className: "px-4 pb-1 text-xs font-bold capitalize text-brand-grey-800 break-words", children: l }),
        /* @__PURE__ */ e(
          "nav",
          {
            "data-slot": "navigation-sidebar-nav",
            className: "flex-1 overflow-y-auto px-1 py-1",
            children: /* @__PURE__ */ e("ul", { className: "flex flex-col", role: "list", children: t.map((m) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
              z,
              {
                item: m,
                collapsed: r,
                onItemClick: n
              }
            ) }, m.id)) })
          }
        ),
        /* @__PURE__ */ e("div", { "data-slot": "navigation-sidebar-footer", className: "px-1 py-1", children: /* @__PURE__ */ a("ul", { className: "flex flex-col", role: "list", children: [
          /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
            C,
            {
              collapsed: r,
              onToggleCollapse: i,
              collapseIcon: p,
              expandIcon: b
            }
          ) }),
          /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
            k,
            {
              collapsed: r,
              helpCenterUrl: x,
              helpIcon: g
            }
          ) }),
          o && /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
            G,
            {
              collapsed: r,
              username: o,
              onLogout: f,
              userIcon: v
            }
          ) })
        ] }) })
      ]
    }
  );
}
function C({
  collapsed: t,
  onToggleCollapse: r,
  collapseIcon: i,
  expandIcon: n
}) {
  const s = t ? n : i, l = t ? "Expand" : "Collapse", o = /* @__PURE__ */ a(
    "button",
    {
      "data-slot": "navigation-sidebar-collapse-item",
      className: c(
        "flex w-full items-center gap-2 rounded px-3 py-1.5 text-sm font-medium",
        "text-brand-grey-800 transition-colors hover:bg-white/[0.08]",
        "min-h-9",
        t && "justify-center px-0"
      ),
      onClick: r,
      children: [
        s && /* @__PURE__ */ e("span", { className: "flex shrink-0 items-center justify-center size-[18px]", children: s }),
        !t && /* @__PURE__ */ e("span", { className: "truncate", children: l })
      ]
    }
  );
  return t ? /* @__PURE__ */ a(d, { children: [
    /* @__PURE__ */ e(h, { asChild: !0, children: o }),
    /* @__PURE__ */ e(u, { side: "right", children: l })
  ] }) : o;
}
function k({
  collapsed: t,
  helpCenterUrl: r,
  helpIcon: i
}) {
  const n = "Help Center", s = /* @__PURE__ */ a(
    "a",
    {
      "data-slot": "navigation-sidebar-help-item",
      href: r,
      target: "_blank",
      rel: "noopener noreferrer",
      className: c(
        "flex w-full items-center gap-2 rounded px-3 py-1.5 text-sm font-medium",
        "text-brand-grey-800 transition-colors hover:bg-white/[0.08]",
        "min-h-9 no-underline",
        t && "justify-center px-0"
      ),
      children: [
        i && /* @__PURE__ */ e("span", { className: "flex shrink-0 items-center justify-center size-[18px]", children: i }),
        !t && /* @__PURE__ */ e("span", { className: "truncate", children: n })
      ]
    }
  );
  return t ? /* @__PURE__ */ a(d, { children: [
    /* @__PURE__ */ e(h, { asChild: !0, children: s }),
    /* @__PURE__ */ e(u, { side: "right", children: n })
  ] }) : s;
}
function G({
  collapsed: t,
  username: r,
  onLogout: i,
  userIcon: n
}) {
  const [s, l] = N.useState(!1), o = /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "navigation-sidebar-user-item",
      className: c(
        "relative flex w-full items-center gap-2 rounded px-3 py-1.5 text-sm font-medium",
        "text-brand-grey-800 transition-colors hover:bg-white/[0.08]",
        "min-h-9 cursor-pointer",
        t && "justify-center px-0"
      ),
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
      children: [
        n && /* @__PURE__ */ e("span", { className: "flex shrink-0 items-center justify-center size-[18px]", children: n }),
        !t && /* @__PURE__ */ e(
          "span",
          {
            className: "truncate max-w-[80px]",
            title: r,
            children: r
          }
        ),
        s && i && /* @__PURE__ */ e(
          "div",
          {
            className: c(
              "absolute bg-white border border-[#ddd] rounded p-2 shadow-sm z-20",
              "flex items-center",
              "left-full ml-2 bottom-0"
            ),
            children: /* @__PURE__ */ e(
              "button",
              {
                className: "text-sm text-brand-secondary-500 whitespace-nowrap hover:underline",
                onClick: (f) => {
                  f.stopPropagation(), i();
                },
                children: "Logout"
              }
            )
          }
        )
      ]
    }
  );
  return t ? /* @__PURE__ */ a(d, { children: [
    /* @__PURE__ */ e(h, { asChild: !0, children: o }),
    /* @__PURE__ */ e(u, { side: "right", children: r })
  ] }) : o;
}
export {
  O as NavigationSidebar
};
//# sourceMappingURL=NavigationSidebar.js.map
