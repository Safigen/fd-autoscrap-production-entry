export declare const USER_ROLES: {
    readonly admin: "admin";
    readonly operator: "operator";
    readonly viewer: "viewer";
};
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
};
//# sourceMappingURL=user.d.ts.map