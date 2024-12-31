import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

interface Blog {
  id: string;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://3wm94pke18.microcms.io/api/v1/blogs",
          {
            headers: {
              "X-MICROCMS-API-KEY": "X8WxIKj3l8ttXbqQ5V4q8zXXyQWV5Rc5aW2H", // MicroCMSのAPIキーを使う
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
      <div className="home">
        <div className="self-caption">
          <h1 className="blog">1m4nimのBlog</h1>
          <p className="caption">
            ここに書いていくものはすべてフィクションです
          </p>
        </div>
        <div className="blog-section">
          {loading ? (
            <p>Loading...</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="blog-post">
                <h2>
                  <Link
                    to={`/blog/${blog.id}`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {blog.title}
                  </Link>
                </h2>
                <p>{blog.body}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 詳細ページのルーティング */}
      <Routes>
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
};

const BlogDetail: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const blogId = window.location.pathname.split("/")[2]; // URLからIDを取得

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://3wm94pke18.microcms.io/api/v1/blogs/${blogId}`,
          {
            headers: {
              "X-MICROCMS-API-KEY": "X8WxIKj3l8ttXbqQ5V4q8zXXyQWV5Rc5aW2H", // MicroCMSのAPIキーを使う
            },
          }
        );
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      <h2>{blog.title}</h2>
      <p>{blog.body}</p>
    </div>
  );
};

export default App;
