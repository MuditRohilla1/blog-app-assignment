import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Markdown from "react-markdown";
import { toast } from "react-toastify";
import DarkModeToggle from "../components/DarkModeToggle";

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load post");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-300">Loading...</p>;

  if (!post)
    return <p className="text-center mt-10 text-gray-300">Post not found.</p>;

  return (
    <div className="pt-20 min-h-screen bg-gray-100 dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      <DarkModeToggle />

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-4">{post.title}</h2>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <div className="prose dark:prose-invert bg-white/10 backdrop-blur p-4 rounded-xl">
          <Markdown>{post.markdown}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default PostView;
