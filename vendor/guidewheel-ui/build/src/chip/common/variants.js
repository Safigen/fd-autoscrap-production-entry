import { cva as r } from "../../../node_modules/class-variance-authority/dist/index.js";
import { clsx as e } from "../../../node_modules/clsx/dist/clsx.js";
const a = r(
  e(
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 px-2 py-1",
    "overflow-hidden whitespace-nowrap border font-normal"
  ),
  {
    variants: {
      size: {
        md: e(
          "gap-1.5 rounded-sm border-muted bg-surface text-sm text-surface-foreground"
        ),
        sm: e(
          "rounded border bg-surface-accent px-1 text-xs text-surface-accent-foreground"
        )
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
export {
  a as chipVariants
};
//# sourceMappingURL=variants.js.map
