import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetail.css";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLからIDを取得
  const [blog, setBlog] = useState<{ title: string; content: string } | null>(
    null
  );

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://3wm94pke18.microcms.io/api/v1/blogs/${id}`,
          {
            headers: {
              "X-MICROCMS-API-KEY": "X8WxIKj3l8ttXbqQ5V4q8zXXyQWV5Rc5aW2H", // APIキーを設定
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
  }, [id]);

  // HTMLタグを取り除く関数
  const stripHtmlTags = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || ""; // テキストのみを取得
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      <h2>{blog.title}</h2>
      <p>{stripHtmlTags(blog.content)}</p> {/* タグを取り除いて表示 */}
    </div>
  );
};

export default BlogDetail;
