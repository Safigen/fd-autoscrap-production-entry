import { CHART_PALETTE as o } from "./common/chart-colors.js";
const l = {
  color: o,
  backgroundColor: "#ffffff",
  textStyle: {
    fontFamily: "Dosis, sans-serif",
    color: "#516D7B"
    // brand-grey-800
  },
  title: {
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#1a1a1a"
    },
    subtextStyle: {
      color: "#516D7B"
    }
  },
  grid: {
    containLabel: !0
  },
  categoryAxis: {
    axisLine: {
      show: !0,
      lineStyle: { color: "#E0E7EA" }
      // brand-grey-300
    },
    axisTick: {
      show: !1
    },
    axisLabel: {
      color: "#516D7B",
      // brand-grey-800
      fontSize: 12
    },
    splitLine: {
      show: !1
    }
  },
  valueAxis: {
    axisLine: {
      show: !1
    },
    axisTick: {
      show: !1
    },
    axisLabel: {
      color: "#516D7B",
      // brand-grey-800
      fontSize: 12
    },
    splitLine: {
      show: !0,
      lineStyle: {
        color: "#E0E7EA"
        // brand-grey-300
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: !0,
      lineStyle: { color: "#E0E7EA" }
    },
    axisTick: {
      show: !1
    },
    axisLabel: {
      color: "#516D7B",
      fontSize: 12
    },
    splitLine: {
      show: !1
    }
  },
  tooltip: {
    backgroundColor: "#ffffff",
    borderColor: "#E0E7EA",
    // brand-grey-300
    borderWidth: 1,
    textStyle: {
      color: "#1a1a1a",
      fontSize: 13
    },
    extraCssText: "box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
  },
  legend: {
    textStyle: {
      color: "#1a1a1a",
      fontWeight: "bold",
      fontSize: 13
    }
  },
  line: {
    symbol: "circle",
    symbolSize: 4,
    smooth: !1,
    lineStyle: {
      width: 2
    }
  },
  bar: {
    barMaxWidth: 30
  }
};
export {
  l as guidewheelChartTheme
};
//# sourceMappingURL=chart-theme.js.map
