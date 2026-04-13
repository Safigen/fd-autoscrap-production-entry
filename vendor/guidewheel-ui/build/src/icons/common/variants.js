import { cva as s } from "class-variance-authority";
const e = s("", {
  variants: {
    size: {
      xs: "size-3",
      // 12px
      sm: "size-4",
      // 16px
      md: "size-5",
      // 20px
      lg: "size-6",
      // 24px
      xl: "size-8",
      // 32px
      "2xl": "size-12",
      // 48px - For large touch targets
      none: null
      //  No size applied - manual override via className
    }
  },
  defaultVariants: {
    size: "md"
  }
});
export {
  e as iconVariants
};
//# sourceMappingURL=variants.js.map
