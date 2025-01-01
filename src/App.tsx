import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ArticlesList from "./ArticlesList";

interface Article {
  id: string;
  title: string;
  content: string;
  eyecatch: { url: string; height: number; width: number };
  category: { name: string };
}

const App: React.FC = () => {
  const [articles] = useState<Article[]>([]); // 記事データ
  const [blogs, setBlogs] = useState<Article[]>([]); // ブログデータ
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
        const blogData = await response.json();
        setBlogs(blogData.contents);
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
                <p>{blog.content}</p> {/* blog.bodyからblog.contentに修正 */}
                <ArticlesList articles={articles} />
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
  const [blog, setBlog] = useState<Article | null>(null);
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
      <p>{blog.content}</p> {/* blog.bodyからblog.contentに修正 */}
    </div>
  );
};

export default App;
