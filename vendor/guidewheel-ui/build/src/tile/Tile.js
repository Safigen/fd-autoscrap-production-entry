import { jsx as i } from "react/jsx-runtime";
import { cva as l } from "class-variance-authority";
import { cn as a } from "../utils/cn.js";
const n = l(
  "flex flex-col items-center justify-center rounded border bg-card",
  {
    variants: {
      size: {
        md: "p-2"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function d({
  className: e,
  size: t,
  ...r
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "tile",
      className: a(n({ size: t }), e),
      ...r
    }
  );
}
function f({ className: e, ...t }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "tile-icon",
      className: a("text-card-icon", e),
      ...t
    }
  );
}
function m({ className: e, ...t }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "tile-label",
      className: a(
        "w-full overflow-hidden text-ellipsis whitespace-nowrap text-center",
        e
      ),
      ...t
    }
  );
}
export {
  d as Tile,
  f as TileIcon,
  m as TileLabel
};
//# sourceMappingURL=Tile.js.map
