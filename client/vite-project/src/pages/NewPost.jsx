import { useState, useEffect } from 'react';
import { createPost, fetchCategories } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [form, setForm] = useState({ title: '', content: '', category: '' });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="border w-full p-2"
        required
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
        className="border w-full p-2"
        required
      />
      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        className="border w-full p-2"
        required
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Create</button>
    </form>
  );
}
