import { toast as c } from "../../node_modules/sonner/dist/index.js";
const e = (s) => ({
  /**
   * Show a success toast in the specified toaster.
   */
  success: (r, o) => c.success(r, { ...o, toasterId: s }),
  /**
   * Show an error toast in the specified toaster.
   */
  error: (r, o) => c.error(r, { ...o, toasterId: s })
});
export {
  e as toastFor
};
//# sourceMappingURL=toastFor.js.map
