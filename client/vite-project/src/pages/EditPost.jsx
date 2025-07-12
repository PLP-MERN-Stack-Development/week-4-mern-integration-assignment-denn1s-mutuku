import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost, fetchCategories } from '../api/api';

export default function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '', category: '' });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost(id).then(res => setForm(res.data));
    fetchCategories().then(res => setCategories(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, form);
    navigate(`/post/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="border border-gray-300 w-full p-2 rounded"
        required
      />
      <textarea
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
        className="border border-gray-300 w-full p-2 rounded h-40"
        required
      />
      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        className="border border-gray-300 w-full p-2 rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Update Post
      </button>
    </form>
  );
}
