// Это родительский компонент для комментариев он не от кого не зависит запрашивает данные и содержит в себе состояние.
import React from "react";
import { orderBy } from "lodash";

import CommentsList from "../common/comments/commentList";
import AddCommentForm from "../common/comments/addCommentForm";
import { useComments } from "../hooks/useComments";

const Comments = () => {
  const { createComment, comments, removeComment } = useComments();

  const handleRemoveComment = (id) => {
    removeComment(id);
  };

  const handleSubmit = (data) => {
    createComment(data);
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {comments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
