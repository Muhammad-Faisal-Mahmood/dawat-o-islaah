import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogContext } from "../../context/BlogContext";
import { useAuthData } from "../../context/AuthContext";

const BlogDetail = () => {
  const { blog } = useBlogContext();
  const { blogid } = useParams();
  const [commentInput, setCommentInput] = useState("");
  const { user } = useAuthData();
  const isUser = !!user;

  const selectedBlog = blog.find((b) => String(b.id) === String(blogid));

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
      <p className="text-sm text-gray-500 mb-6">By Amaze Technologies</p>

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
            {selectedBlog.comments.map((comment) => (
              <li
                key={comment.id}
                className="bg-gray-100 p-4 rounded-lg flex items-start gap-4"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {comment.user_name?.charAt(0).toUpperCase()}
                </div>

                {/* Comment Content */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {comment.user_name}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    {comment.user_email}
                  </p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </li>
            ))}
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
        <div className="flex gap-2 items-center">
          <input
            disabled={!isUser}
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
          isUser
            ? "border-gray-300 focus:ring-green-400"
            : "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
        }`}
          />
          <button
            disabled={!isUser}
            className={`px-4 py-2 rounded text-white transition
        ${
          isUser
            ? "bg-[#1E3A5F] hover:bg-[#16324d]"
            : "bg-gray-400 cursor-not-allowed"
        }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
