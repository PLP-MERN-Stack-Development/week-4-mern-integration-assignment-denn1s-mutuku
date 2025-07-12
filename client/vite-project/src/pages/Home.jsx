import { useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { fetchPosts } from '../api/api';

export default function Home() {
  const { posts, setPosts } = useBlog();

  useEffect(() => {
    fetchPosts().then(res => setPosts(res.data));
  }, [setPosts]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Blog Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="mb-3">
          <a href={`/post/${post._id}`} className="text-blue-700 font-semibold">
            {post.title}
          </a>
        </div>
      ))}
    </div>
  );
}
