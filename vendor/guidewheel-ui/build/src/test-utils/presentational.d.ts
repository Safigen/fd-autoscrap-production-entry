import { type ComponentType, type ReactNode } from 'react';
/**
 * Configuration for testing presentational components with variants
 */
export interface PresentationalTestConfig<T = any> {
    /** The component to test */
    Component: ComponentType<T>;
    /** Name for test descriptions */
    componentName: string;
    /**
     * Variant configurations for testing different prop combinations
     * @example
     * variantProps: {
     *   variant: ['default', 'secondary'],
     *   size: ['sm', 'lg'],
     *   color: ['blue', 'red']
     * }
     */
    variantProps?: Record<string, Array<string | {
        value: string;
        extraProps?: Record<string, any>;
    }>>;
    /** Default content to render in tests */
    defaultContent?: ReactNode;
    /** Additional props to pass to component in all tests */
    defaultProps?: Record<string, any>;
    /** Custom tests to run alongside the standard suite */
    customTests?: () => void;
    /** Skip accessibility tests (default: false) */
    skipA11yTests?: boolean;
    /** Component supports asChild prop via Radix Slot (default: false) */
    supportsAsChild?: boolean;
}
/**
 * Creates a standard test suite for presentational components.
 *
 * This utility covers the basic requirements that most presentational
 * components should meet without requiring repetitive test code.
 *
 * @param config - Configuration object for the test suite
 */
export declare function createPresentationalTestSuite<T = any>(config: PresentationalTestConfig<T>): () => void;
interface SmokeTestOptions {
    /** Additional props to pass to component in all tests */
    defaultProps?: Record<string, any>;
    /** Component supports asChild prop via Radix Slot (default: false) */
    supportsAsChild?: boolean;
}
/**
 * Simple smoke test for components that don't need the full suite
 */
export declare function createPresentationalSmokeTest<T>(Component: ComponentType<T>, componentName: string, options?: SmokeTestOptions): () => void;
export {};
//# sourceMappingURL=presentational.d.ts.map