import type React from 'react';
import type { ChipProps } from './Chip';
interface ToggleChipOwnProps {
    children: React.ReactNode;
    /** Whether the chip should be shown as enabled. */
    pressed?: boolean;
}
export type ToggleChipProps = ToggleChipOwnProps & ChipProps;
/**
 * A non-interactive chip that represents an on or off state. Combines Chip with
 * Toggle styling.
 *
 * Use Toggle if you need interactivity.
 */
declare function ToggleChip({ pressed, className, ...chipProps }: ToggleChipProps): import("react/jsx-runtime").JSX.Element;
export { ToggleChip };
//# sourceMappingURL=ToggleChip.d.ts.map