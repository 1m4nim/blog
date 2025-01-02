import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetail.css";

interface Blog {
  title: string;
  content: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://3wm94pke18.microcms.io/api/v1/blogs/${id}`,
          {
            headers: {
              "X-MICROCMS-API-KEY": "X8WxIKj3l8ttXbqQ5V4q8zXXyQWV5Rc5aW2H",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!blog) return <p>記事が見つかりませんでした。</p>;

  return (
    <div className="blog-post">
      <h2 className="title">{blog.title}</h2>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogDetail;
