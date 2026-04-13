export declare const LOAD_STATES: {
    readonly runtime: "runtime";
    readonly idle: "idle";
    readonly offline: "offline";
    readonly planned: "planned";
    readonly nodata: "nodata";
};
export type LoadState = (typeof LOAD_STATES)[keyof typeof LOAD_STATES];
export type Device = {
    id: string;
    name: string;
    state: LoadState;
    metric?: string;
    metricUnit?: string;
    currentValue?: number;
    runtime?: number;
    uptime?: number;
};
export type DeviceGroup = {
    id: string;
    name: string;
    deviceIds: string[];
};
//# sourceMappingURL=device.d.ts.map