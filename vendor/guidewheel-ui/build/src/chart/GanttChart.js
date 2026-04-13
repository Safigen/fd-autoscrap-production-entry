import { jsx as f } from "react/jsx-runtime";
import { useMemo as w } from "react";
import { cn as C } from "../utils/cn.js";
import { LOAD_STATE_COLORS as u } from "./common/chart-colors.js";
import { HChart as L } from "./HChart.js";
function m(r) {
  return new Date(r).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function H({
  data: r,
  height: n = 24,
  showTooltip: l = !1,
  showXAxis: s = !1,
  className: d
}) {
  const h = w(() => {
    if (r.length === 0)
      return { xAxis: { show: !1 }, yAxis: { show: !1 }, series: [] };
    const x = Math.min(...r.map((t) => t.start)), p = Math.max(...r.map((t) => t.end)), g = r.map((t, e) => ({
      value: [e, t.start, t.end, t.state],
      itemStyle: {
        color: u[t.state] ?? u.nodata
      },
      name: t.label
    }));
    return {
      animation: !1,
      grid: {
        top: 0,
        bottom: s ? 20 : 0,
        left: 0,
        right: 0,
        containLabel: !1
      },
      xAxis: {
        type: "value",
        min: x,
        max: p,
        show: s,
        axisLabel: {
          formatter: (t) => m(t)
        }
      },
      yAxis: {
        show: !1
      },
      tooltip: l ? {
        trigger: "item",
        formatter: (t) => {
          const e = t.value, a = e[3], i = t.name || a, o = m(e[1]), c = m(e[2]);
          return `<strong>${i}</strong><br/>${o} – ${c}`;
        }
      } : { show: !1 },
      series: [
        {
          type: "custom",
          renderItem: (t, e) => {
            const a = e.coord([e.value(1), 0]), i = e.coord([e.value(2), 0]), o = t.coordSys, c = a[0], y = i[0] - a[0], v = (o == null ? void 0 : o.y) ?? 0, b = (o == null ? void 0 : o.height) ?? n;
            return {
              type: "rect",
              shape: {
                x: c,
                y: v,
                width: Math.max(y, 1),
                height: b
              },
              style: e.style()
            };
          },
          encode: {
            x: [1, 2]
          },
          data: g
        }
      ]
    };
  }, [r, n, l, s]);
  return /* @__PURE__ */ f("div", { "data-slot": "gantt-chart", className: C("w-full", d), children: /* @__PURE__ */ f(L, { option: h, height: n }) });
}
export {
  H as GanttChart
};
//# sourceMappingURL=GanttChart.js.map
