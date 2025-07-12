import { createContext, useState, useContext } from 'react';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  return (
    <BlogContext.Provider value={{ posts, setPosts, categories, setCategories }}>
      {children}
    </BlogContext.Provider>
  );
};
