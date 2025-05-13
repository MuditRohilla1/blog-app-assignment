import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import DarkModeToggle from '../components/DarkModeToggle';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !markdown || !category || !tags) {
      return toast.error('Title, markdown, category, and tags are required');
    }

    const tagsArray = tags.split(',').map(tag => tag.trim());

    try {
      await axios.post('http://localhost:5000/api/posts', { 
        title, 
        markdown, 
        category, 
        tags: tagsArray 
      });
      toast.success('Post created!');
      navigate('/');
    } catch (err) {
      toast.error('Error creating post');
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-100 dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      <DarkModeToggle />

      <div className="max-w-5xl mx-auto px-6 py-6">
        <h2 className="text-3xl font-bold mb-4">📝 Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-gray-700 backdrop-blur border border-white/30 text-white placeholder-gray-300"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full h-40 p-3 rounded-lg bg-gray-700 backdrop-blur border border-white/30 text-white placeholder-gray-300"
            placeholder="Write your markdown markdown here..."
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
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
            placeholder="Add tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Publish
          </button>
        </form>

        <h3 className="text-xl mt-10 font-semibold">🔍 Preview</h3>
        <div className="prose dark:prose-invert bg-gray-700 backdrop-blur p-4 rounded-xl mt-2">
          <Markdown>{markdown}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;