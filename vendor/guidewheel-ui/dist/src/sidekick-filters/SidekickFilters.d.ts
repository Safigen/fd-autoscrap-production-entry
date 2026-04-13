type SidekickFiltersProps = {
    deviceName: string;
    timeRangeLabel: string;
    devices?: Array<{
        id: string;
        name: string;
    }>;
    selectedDeviceId?: string;
    onDeviceChange?: (id: string) => void;
    shifts?: Array<{
        id: string;
        name: string;
    }>;
    selectedShiftId?: string;
    onShiftChange?: (id: string) => void;
    shiftMode?: boolean;
    onShiftModeChange?: (isShift: boolean) => void;
    className?: string;
};
/**
 * A dropdown menu button for the Sidekick HMI operator interface,
 * matching the Vue OperatorTagging Filters component.
 *
 * Trigger shows: deviceName, timeRangeLabel, and a dropdown chevron.
 * Content shows: device single-select list, divider, shift mode toggle,
 * and shift or range selector.
 */
declare function SidekickFilters({ deviceName, timeRangeLabel, devices, selectedDeviceId, onDeviceChange, shifts, selectedShiftId, onShiftChange, shiftMode, onShiftModeChange, className, }: SidekickFiltersProps): import("react/jsx-runtime").JSX.Element;
export { SidekickFilters };
export type { SidekickFiltersProps };
//# sourceMappingURL=SidekickFilters.d.ts.map