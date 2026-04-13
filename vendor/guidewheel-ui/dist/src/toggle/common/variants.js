import { cva as t } from "../../../node_modules/class-variance-authority/dist/index.js";
const a = t(
  [
    "inline-flex gap-2 font-normal text-surface-foreground",
    "hover:bg-surface-accent hover:text-surface-accent-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-btn-pressed data-[state=on]:text-btn-primary",
    "outline-none transition-[color,box-shadow] focus-visible:ring-2",
    "items-center justify-center whitespace-nowrap bg-transparent",
    "group-data-[orientation=vertical]/toggle-group:justify-start"
  ],
  {
    variants: {
      size: {
        sm: "h-6 min-w-6 p-1 text-xs",
        md: "h-8 min-w-8 px-2 text-sm",
        lg: "h-10 min-w-10 px-3 text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
export {
  a as toggleVariants
};
//# sourceMappingURL=variants.js.map
