import { cva as e } from "class-variance-authority";
const t = [
  "inline-flex items-center justify-center gap-1",
  "whitespace-nowrap rounded-[3px] border font-medium",
  "transition-all",
  "no-underline outline-none",
  "disabled:pointer-events-none",
  "focus-visible:outline-none focus-visible:ring-2"
], r = {
  sm: "h-6 px-2 py-1.5 text-xs",
  md: "h-9 px-3 py-2 text-sm",
  lg: "h-10 px-4 py-3 text-base",
  icon: "size-9"
}, a = e(
  [t, "disabled:bg-surface disabled:text-pale-foreground"],
  {
    variants: {
      color: {
        default: [
          "border bg-btn text-btn-foreground",
          "hover:border-accent hover:bg-btn-accent",
          "active:border-accent active:bg-btn-accent"
        ],
        primary: [
          "border-transparent bg-btn-primary text-btn-primary-foreground",
          "hover:border-transparent hover:bg-btn-primary-accent",
          "active:border-transparent active:bg-btn-primary-accent"
        ],
        secondary: [
          "border bg-btn-secondary text-btn-secondary-foreground",
          "hover:border-accent hover:bg-btn-secondary-accent hover:text-btn-primary-accent",
          "active:border-accent active:bg-btn-secondary-accent active:text-btn-primary-accent"
        ],
        danger: [
          "border-transparent bg-btn-danger text-btn-danger-foreground",
          "hover:border-transparent hover:bg-btn-danger-accent",
          "active:border-transparent active:bg-btn-danger-accent"
        ]
      },
      size: r
    },
    defaultVariants: {
      color: "default",
      size: "md"
    }
  }
), o = e(
  [t, "border-transparent disabled:text-pale-foreground"],
  {
    variants: {
      color: {
        default: [
          "text-surface-foreground",
          "hover:bg-surface",
          "active:bg-surface"
        ],
        primary: [
          "text-btn-primary",
          "hover:bg-surface hover:text-btn-primary-accent",
          "active:bg-surface active:text-btn-primary-accent"
        ],
        secondary: [
          "text-surface-foreground",
          "hover:bg-surface",
          "active:bg-surface"
        ],
        danger: [
          "text-btn-danger",
          "hover:bg-btn-danger-accent-foreground hover:text-btn-danger-accent",
          "active:bg-btn-danger-accent-foreground active:text-btn-danger-accent"
        ]
      },
      size: r
    },
    defaultVariants: {
      color: "default",
      size: "md"
    }
  }
);
export {
  a as solidButtonVariants,
  o as textButtonVariants
};
//# sourceMappingURL=variants.js.map
