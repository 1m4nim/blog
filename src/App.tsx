import React, { useEffect, useState } from "react";
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
              "X-MICROCMS-API-KEY": "X8WxIKj3l8ttXbqQ5V4q8zXXyQWV5Rc5aW2H", // MicroCMS APIキーを追加
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
              <h2>{blog.title}</h2>
              <p>{blog.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
