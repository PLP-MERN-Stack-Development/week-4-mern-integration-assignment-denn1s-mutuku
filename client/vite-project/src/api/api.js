import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchPosts = () => API.get('/posts');
export const fetchPost = id => API.get(`/posts/${id}`);
export const createPost = data => API.post('/posts', data);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = id => API.delete(`/posts/${id}`);
export const fetchCategories = () => API.get('/categories');
