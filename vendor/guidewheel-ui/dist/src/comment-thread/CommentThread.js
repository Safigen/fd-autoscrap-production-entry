import { jsxs as l, jsx as t } from "react/jsx-runtime";
import { useState as o } from "react";
import { Avatar as c, AvatarImage as d, AvatarFallback as f } from "../avatar/Avatar.js";
import { Button as u } from "../button/Button.js";
import { Textarea as p } from "../textarea/Textarea.js";
import { cn as h } from "../utils/cn.js";
function x({ comment: e }) {
  const r = e.author.split(" ").map((a) => a[0]).join("").toUpperCase().slice(0, 2);
  return /* @__PURE__ */ l("div", { "data-slot": "comment-item", className: "flex gap-3", children: [
    /* @__PURE__ */ l(c, { size: "sm", children: [
      e.avatarUrl ? /* @__PURE__ */ t(d, { src: e.avatarUrl, alt: e.author }) : null,
      /* @__PURE__ */ t(f, { children: r })
    ] }),
    /* @__PURE__ */ l("div", { className: "flex flex-1 flex-col gap-1", children: [
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t("span", { className: "text-sm font-medium", children: e.author }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted-foreground", children: e.timestamp })
      ] }),
      /* @__PURE__ */ t("p", { className: "text-sm", children: e.content })
    ] })
  ] });
}
function v({
  onAddComment: e,
  placeholder: r = "Write a comment..."
}) {
  const [a, i] = o("");
  function s(m) {
    m.preventDefault();
    const n = a.trim();
    n && (e(n), i(""));
  }
  return /* @__PURE__ */ l(
    "form",
    {
      "data-slot": "comment-form",
      onSubmit: s,
      className: "flex flex-col gap-2",
      children: [
        /* @__PURE__ */ t(
          p,
          {
            value: a,
            onChange: (m) => i(m.target.value),
            placeholder: r
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex justify-end", children: /* @__PURE__ */ t(u, { type: "submit", size: "sm", disabled: !a.trim(), children: "Submit" }) })
      ]
    }
  );
}
function U({
  comments: e,
  onAddComment: r,
  placeholder: a,
  className: i
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "comment-thread",
      className: h("flex flex-col gap-4", i),
      children: [
        e.map((s) => /* @__PURE__ */ t(x, { comment: s }, s.id)),
        r ? /* @__PURE__ */ t(v, { onAddComment: r, placeholder: a }) : null
      ]
    }
  );
}
export {
  v as CommentForm,
  x as CommentItem,
  U as CommentThread
};
//# sourceMappingURL=CommentThread.js.map
