import { useEffect, useState } from "react";

// fetchBlogPosts のインポート
import { fetchBlogPosts } from "./index";

// ブログ投稿の型を定義
type BlogPost = {
  id: string;
  title: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // fetchBlogPosts を呼び出してデータを取得
        const data: BlogPost[] = await fetchBlogPosts();
        setPosts(data);
      } catch (err: unknown) {
        // err がオブジェクトで message プロパティを持つか確認
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    loadPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
