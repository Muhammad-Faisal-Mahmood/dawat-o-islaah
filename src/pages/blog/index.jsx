import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthData } from "../../context/AuthContext";
import { backendApiClient, setAuthToken } from "../../api/backendApi";
import useBlogs from "../../hooks/useBlogs";
import { useBlogContext } from "../../context/BlogContext";
import { useLanguage } from "../../context/LanguageContext";

const BlogDetail = () => {
  const { t } = useLanguage();
  const { blogs, loading: blogsLoading, error: blogsError } = useBlogs();
  const { blogid } = useParams();
  const { user, token } = useAuthData();
  const isUser = !!user;

  const { refreshBlogComments } = useBlogContext();

  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const selectedBlog = blogs.find((b) => String(b.id) === String(blogid));

  const handleCommentSubmit = async () => {
    if (!commentInput.trim() || !isUser) return;

    setIsSubmitting(true);
    setCommentError(null);

    try {
      if (token) {
        setAuthToken(token);
      }

      await backendApiClient.post(`/blogs/${blogid}/comments/create/`, {
        content: commentInput,
      });

      await refreshBlogComments(blogid);
      setCommentInput("");
    } catch (err) {
      console.error("Error posting comment:", err);
      setCommentError(err.response?.data?.message || "Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    if (!editingContent.trim()) return;

    try {
      setAuthToken(token);
      await backendApiClient.patch(`/blogs/comments/${commentId}/`, {
        content: editingContent,
      });

      await refreshBlogComments(blogid);
      setEditingCommentId(null);
      setEditingContent("");
    } catch (err) {
      console.error("Failed to update comment", err);
      setCommentError("Failed to update comment");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      setAuthToken(token);
      await backendApiClient.delete(`/blogs/comments/${commentId}/`);
      await refreshBlogComments(blogid);
    } catch (err) {
      console.error("Failed to delete comment", err);
      setCommentError("Failed to delete comment");
    }
  };

  if (blogsLoading) {
    return <div className="text-center py-10">Loading blog...</div>;
  }

  if (blogsError) {
    return (
      <div className="text-center py-10 text-red-500">Error loading blog.</div>
    );
  }

  if (!selectedBlog) {
    return (
      <div className="text-center py-10 text-red-500">Blog not found.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg my-10">
      {/* Blog Image */}
      <img
        src={selectedBlog.featured_image}
        alt={selectedBlog.title}
        className="w-full h-80 object-cover mb-6 rounded"
      />

      {/* Title and Meta */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {selectedBlog.title}
      </h1>
      <p className="text-sm text-green-600 mb-1">
        {new Date(selectedBlog.created_at).toLocaleDateString()}
      </p>
      {/* <p className="text-sm text-gray-500 mb-6">By Amaze Technologies</p> */}

      {/* Blog Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
      ></div>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Comments</h2>

        {selectedBlog.comments && selectedBlog.comments.length > 0 ? (
          <ul className="space-y-6">
            {selectedBlog.comments.map((comment) => {
              const isOwnComment = comment.user_email === user?.email;
              const isEditing = editingCommentId === comment.id;

              return (
                <li
                  key={comment.id}
                  className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {comment.user_name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {comment.user_name}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          {comment.user_email}
                        </p>
                      </div>
                      {isOwnComment && !isEditing && (
                        <div className="flex gap-2 text-sm">
                          <button
                            onClick={() => handleEdit(comment)}
                            className="text-green-600 cursor-pointer hover:text-green-800"
                          >
                            {t("Blog.edit")}
                          </button>
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="text-red-600 cursor-pointer hover:text-red-700"
                          >
                            {t("Blog.delete")}
                          </button>
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="mt-2 flex flex-col sm:flex-row gap-2">
                        <input
                          className="border rounded p-2 flex-1"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                        />
                        <button
                          onClick={() => handleUpdateComment(comment.id)}
                          className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded"
                        >
                          {t("Blog.update")}
                        </button>
                        <button
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditingContent("");
                          }}
                          className="px-4 py-2 bg-gray-400 cursor-pointer text-white rounded"
                        >
                          {t("Blog.cancel")}
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 mt-1">
                        {comment.content}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      {/* Add a Comment */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Post a Comment
        </h2>
        {commentError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {commentError}
          </div>
        )}
        <div className="flex gap-2 items-center">
          <input
            disabled={!isUser || isSubmitting}
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder={
              isUser
                ? "Write your comment..."
                : "To post a comment, you need to be logged in..."
            }
            className={`flex-1 border p-2 rounded focus:outline-none focus:ring-2
              ${
                isUser && !isSubmitting
                  ? "border-gray-300 focus:ring-green-400"
                  : "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleCommentSubmit();
              }
            }}
          />
          <button
            disabled={!isUser || isSubmitting || !commentInput.trim()}
            onClick={handleCommentSubmit}
            className={`px-4 py-2 rounded text-white transition
              ${
                isUser && !isSubmitting && commentInput.trim()
                  ? "bg-[#1E3A5F] hover:bg-[#16324d]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
