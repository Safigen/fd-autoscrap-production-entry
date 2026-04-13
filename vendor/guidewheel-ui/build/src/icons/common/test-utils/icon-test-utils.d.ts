import { type ComponentType } from 'react';
import type { IconProps } from '../variants';
/**
 * Creates a standard smoke test for an icon component.
 *
 * This utility covers the basic requirements that all icon components
 * should meet without requiring individual test files for each icon.
 *
 * @param IconComponent - The icon component to test
 * @param iconName - Name of the icon for test descriptions
 */
export declare function createIconSmokeTest(IconComponent: ComponentType<IconProps>, iconName: string): () => void;
/**
 * Creates a reusable test suite for multiple icons at once.
 */
export declare function createIconTestSuite(icons: Record<string, ComponentType<IconProps>>): () => void;
//# sourceMappingURL=icon-test-utils.d.ts.map