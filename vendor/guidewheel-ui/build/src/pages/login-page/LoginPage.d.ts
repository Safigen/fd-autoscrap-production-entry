type LoginPageProps = {
    /** Error message to display (e.g. invalid credentials). */
    errorMessage?: string;
    className?: string;
};
/**
 * Login page composition mirroring LoginWithUsername.vue + LoginWrapper.vue.
 *
 * Layout:
 * - Full viewport background (#fafbfc)
 * - Centered card (max-w-[400px]) with border, shadow, rounded corners
 * - Guidewheel logo at top
 * - "Sign in" heading
 * - Email/username field + password field
 * - "Forgot password?" link
 * - Full-width "Sign In" button
 *
 * Storybook-only -- not exported from the package.
 */
declare function LoginPage({ errorMessage, className }: LoginPageProps): import("react/jsx-runtime").JSX.Element;
export { LoginPage };
export type { LoginPageProps };
//# sourceMappingURL=LoginPage.d.ts.map