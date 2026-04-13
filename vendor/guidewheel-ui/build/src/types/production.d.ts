export type Shift = {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
};
export type SKU = {
    id: string;
    name: string;
    targetRate?: number;
};
export type ProductionPeriod = {
    id: string;
    shiftId: string;
    skuId?: string;
    startTime: number;
    endTime: number;
    goodCount: number;
    rejectCount: number;
    targetCount?: number;
};
//# sourceMappingURL=production.d.ts.map