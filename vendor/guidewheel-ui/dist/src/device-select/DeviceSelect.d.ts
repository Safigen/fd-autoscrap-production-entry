type Device = {
    /** Unique identifier (deviceid). */
    id: string;
    /** Display name (nickname). */
    name: string;
    /** Optional status — "A" = active. */
    status?: string;
};
type DeviceGroup = {
    /** Unique identifier (groupid). */
    id: string;
    /** Display name (nickname). */
    name: string;
    /** Optional status — "A" = active. */
    status?: string;
};
type DeviceSelectProps = {
    /** List of selectable devices. */
    devices: Device[];
    /** Currently selected device or group id. */
    selectedId?: string;
    /** Called when the user selects a device or group. */
    onSelect: (id: string) => void;
    /**
     * When true, also show device groups in the dropdown.
     * Groups are separated from individual devices.
     */
    showGroups?: boolean;
    /** List of device groups — only rendered when `showGroups` is true. */
    groups?: DeviceGroup[];
    /** Placeholder text when nothing is selected. */
    placeholder?: string;
    /** Show an "All devices" option at the top. Defaults to true. */
    showAllOption?: boolean;
    /** Label for the "All devices" option. */
    allOptionLabel?: string;
    /** Whether the select is disabled. */
    disabled?: boolean;
    className?: string;
};
/**
 * A device/device-group selector built on the library `Select` (Radix).
 *
 * Matches the Vue `DevicesV2` / `DevicesAndGroupSelect` pattern:
 * - Optional "All devices" item
 * - Device groups section (when `showGroups` is true)
 * - Individual devices section
 *
 * Uses `SelectPopover` pattern from guidewheel-ui.
 */
declare function DeviceSelect({ devices, selectedId, onSelect, showGroups, groups, placeholder, showAllOption, allOptionLabel, disabled, className, }: DeviceSelectProps): import("react/jsx-runtime").JSX.Element;
export { DeviceSelect };
export type { DeviceSelectProps, Device, DeviceGroup };
//# sourceMappingURL=DeviceSelect.d.ts.map