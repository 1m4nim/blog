import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BlogDetail from "./BlogDetail";

interface Article {
  id: string;
  title: string;
}

const Home: React.FC<{ blogs: Article[]; loading: boolean }> = ({
  blogs,
  loading,
}) => {
  return (
    <div className="home">
      <div className="self-caption">
        <h1 className="blog">1m4nimのBlog</h1>
        <p className="caption">ここに書いていくものはすべてフィクションです</p>
      </div>
      <div className="blog-section">
        {loading ? (
          <p>Loading...</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-post">
              <h2>
                <a
                  href={`/blog/${blog.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  {blog.title}
                </a>
              </h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://3wm94pke18.microcms.io/api/v1/blogs",
          {
            headers: {
              "X-MICROCMS-API-KEY": "X8WxIKj3l8ttXbqQ5V4q8zXXyQWV5Rc5aW2H",
            },
          }
        );
        const data = await response.json();
        setBlogs(data.contents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home blogs={blogs} loading={loading} />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
