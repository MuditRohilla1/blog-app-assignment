import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Markdown from 'react-markdown';
import DarkModeToggle from '../components/DarkModeToggle';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.markdown);
        setCategory(res.data.category || '');  // Set category from fetched post
        setTags(res.data.tags.join(', ') || '');  // Join tags array into a comma-separated string
      })
      .catch(() => toast.error("Failed to fetch post"));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !content || !category || !tags) {
      return toast.error('All fields (title, markdown, category, tags) are required.');
    }

    const tagsArray = tags.split(',').map(tag => tag.trim());

    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, { 
        title, 
        content, 
        category, 
        tags: tagsArray 
      });
      toast.success("Post updated!");
      navigate('/');
    } catch (error) {
      toast.error("Error updating post.");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-100 dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      <DarkModeToggle />

      <div className="max-w-5xl mx-auto px-6 py-6">
        <h2 className="text-3xl font-bold mb-4">✏️ Edit Post</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-gray-700 backdrop-blur border border-white text-white placeholder-gray-300"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full h-40 p-3 rounded-lg bg-gray-700 backdrop-blur border border-white/30 text-white placeholder-gray-300"
            placeholder="Edit markdown content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 backdrop-blur border border-white/30 text-white"
          >
            <option value="">Select Category</option>
            <option value="Programming">Programming</option>
            <option value="Personal">Personal</option>
            <option value="Technology">Technology</option>
            <option value="Other">Other</option>
          </select>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 backdrop-blur border border-white/30 text-white placeholder-gray-300"
            placeholder="Edit tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition"
          >
            Update
          </button>
        </form>

        <h3 className="text-xl mt-10 font-semibold">🔍 Preview</h3>
        <div className="prose dark:prose-invert bg-white/10 backdrop-blur p-4 rounded-xl mt-2">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default EditPost;