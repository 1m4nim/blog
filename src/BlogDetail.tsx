// BlogDetail.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParamsをインポート

// 型定義
interface Post {
  id: string;
  title: string;
  body: string;
}

const BlogDetail = () => {
  const { postId } = useParams(); // URLパラメータからpostIdを取得
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      const res = await fetch(
        `https://3wm94pke18.microcms.io/apis/blogs/${postId}`,
        {
          headers: {
            "X-API-KEY": "X8WxIKj3l8ttXbqQ5V4q8zXXyQWV5Rc5aW2H",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setPost(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (loading) return <p>Loading...</p>;

  if (!post) return <p>Error: Unable to load the post.</p>;

  return (
    <div>
      <h2>（サンプル）まずはこの記事を開きましょう</h2>
      <h3>{post.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
    </div>
  );
};

export default BlogDetail;
