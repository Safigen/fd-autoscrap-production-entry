import * as React from 'react';
type SearchInputProps = React.ComponentProps<'input'> & {
    onClear?: () => void;
};
/**
 * A text input with a leading search icon and an optional trailing clear button.
 *
 * Composed from `Input` and icon components.
 */
declare function SearchInput({ className, value, onClear, ...props }: SearchInputProps): import("react/jsx-runtime").JSX.Element;
export { SearchInput };
export type { SearchInputProps };
//# sourceMappingURL=SearchInput.d.ts.map