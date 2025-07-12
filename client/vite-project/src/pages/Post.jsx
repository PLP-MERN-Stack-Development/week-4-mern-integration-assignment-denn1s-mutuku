import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { fetchPost } from '../api/api';

export default function Post() {
  const { id } = useParams();
  const { data: post, loading, error } = useApi(() => fetchPost(id), [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">Category: {post.category?.name}</p>
      <p>{post.content}</p>
    </div>
  );
}
