type Comment = {
    id: string;
    author: string;
    avatarUrl?: string;
    content: string;
    timestamp: string;
};
type CommentThreadProps = {
    comments: Comment[];
    onAddComment?: (content: string) => void;
    placeholder?: string;
    className?: string;
};
declare function CommentItem({ comment }: {
    comment: Comment;
}): import("react/jsx-runtime").JSX.Element;
declare function CommentForm({ onAddComment, placeholder, }: {
    onAddComment: (content: string) => void;
    placeholder?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function CommentThread({ comments, onAddComment, placeholder, className, }: CommentThreadProps): import("react/jsx-runtime").JSX.Element;
export { CommentThread, CommentItem, CommentForm };
export type { Comment, CommentThreadProps };
//# sourceMappingURL=CommentThread.d.ts.map