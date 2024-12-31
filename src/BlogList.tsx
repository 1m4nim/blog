// BlogList.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link コンポーネントを使用して遷移

interface Post {
  id: string;
  title: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://3wm94pke18.microcms.io/apis/blogs", {
        headers: {
          "X-API-KEY": "X8WxIKj3l8ttXbqQ5V4q8zXXyQWV5Rc5aW2H", // ここに実際のAPIキーを入力
        },
      });
      const data = await res.json();
      setPosts(data.contents); // APIレスポンスの中から記事のリストを設定
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>ブログ一覧</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* postIdをLinkのURLパラメータとして渡す */}
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
