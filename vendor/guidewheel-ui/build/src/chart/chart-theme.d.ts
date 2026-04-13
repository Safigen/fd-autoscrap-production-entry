/**
 * Guidewheel ECharts theme — ported from the reference app light theme.
 *
 * ECharts cannot read CSS custom properties directly, so we hardcode the
 * hex values that correspond to our design tokens.
 */
export declare const guidewheelChartTheme: {
    color: string[];
    backgroundColor: string;
    textStyle: {
        fontFamily: string;
        color: string;
    };
    title: {
        textStyle: {
            fontSize: number;
            fontWeight: "bold";
            color: string;
        };
        subtextStyle: {
            color: string;
        };
    };
    grid: {
        containLabel: boolean;
    };
    categoryAxis: {
        axisLine: {
            show: boolean;
            lineStyle: {
                color: string;
            };
        };
        axisTick: {
            show: boolean;
        };
        axisLabel: {
            color: string;
            fontSize: number;
        };
        splitLine: {
            show: boolean;
        };
    };
    valueAxis: {
        axisLine: {
            show: boolean;
        };
        axisTick: {
            show: boolean;
        };
        axisLabel: {
            color: string;
            fontSize: number;
        };
        splitLine: {
            show: boolean;
            lineStyle: {
                color: string;
            };
        };
    };
    timeAxis: {
        axisLine: {
            show: boolean;
            lineStyle: {
                color: string;
            };
        };
        axisTick: {
            show: boolean;
        };
        axisLabel: {
            color: string;
            fontSize: number;
        };
        splitLine: {
            show: boolean;
        };
    };
    tooltip: {
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        textStyle: {
            color: string;
            fontSize: number;
        };
        extraCssText: string;
    };
    legend: {
        textStyle: {
            color: string;
            fontWeight: "bold";
            fontSize: number;
        };
    };
    line: {
        symbol: string;
        symbolSize: number;
        smooth: boolean;
        lineStyle: {
            width: number;
        };
    };
    bar: {
        barMaxWidth: number;
    };
};
//# sourceMappingURL=chart-theme.d.ts.map