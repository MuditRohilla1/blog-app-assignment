import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DarkModeToggle from "../components/DarkModeToggle";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagsFilter, setTagsFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        setPosts(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch posts");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      toast.success("Post deleted successfully!");
      fetchPosts();
    } catch (error) {
      toast.error("Failed to delete post.");
    }
  };

  const filteredPosts = posts.filter((post) => {
    return (
      (tagsFilter ? post.tags.includes(tagsFilter) : true) &&
      (categoryFilter ? post.category === categoryFilter : true)
    );
  });

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-200">
        Loading posts...
      </p>
    );

  return (
    <div className="pt-24 min-h-screen bg-gray-100 dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      <DarkModeToggle />

      <div className="max-w-5xl mx-auto p-6">

        {/* Filters for tags and category */}
        <div className="flex gap-4 mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 rounded border bg-white dark:bg-[#333333] text-black dark:text-white"
          >
            <option value="">Select Category</option>
            <option value="Programming">Programming</option>
            <option value="Personal">Personal</option>
            <option value="Technology">Technology</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Filter by tag"
            value={tagsFilter}
            onChange={(e) => setTagsFilter(e.target.value)}
            className="p-2 rounded border bg-white dark:bg-[#333333] text-black dark:text-white"
          />
        </div>

        {filteredPosts.length === 0 ? (
          <p>No posts yet. Create one!</p>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-white dark:text-white p-5 rounded-xl shadow-xl transition transform hover:scale-[1.02] hover:shadow-2xl duration-300"
              >
                <Link
                  to={`/post/${post._id}`}
                  className="text-2xl font-semibold hover:underline text-black dark:text-white"
                >
                  {post.title}
                </Link>

                <p className="text-sm text-gray-700 mt-1 dark:text-gray-300">
                  {new Date(post.createdAt).toLocaleString()}
                </p>

                {/* Display tags and category */}
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  <span className="mr-2">Category: {post.category}</span>
                  {post.tags.length > 0 && (
                    <span className="mr-2">
                      Tags:{" "}
                      {post.tags.map((tag, index) => (
                        <span key={index} className="text-blue-500">
                          #{tag}
                          {index < post.tags.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate(`/edit/${post._id}`)}
                    className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
