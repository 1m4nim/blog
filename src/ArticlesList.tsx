import React, { useState } from "react";

// 記事データの型定義
interface Article {
  id: string;
  title: string;
  content: string;
  eyecatch: { url: string; height: number; width: number };
  category: { name: string };
}

interface ArticlesListProps {
  articles: Article[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // 記事タイトルをクリックしたときの処理
  const handleTitleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  return (
    <div>
      {/* 記事一覧を表示 */}
      <div>
        <h2>記事一覧</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <button onClick={() => handleTitleClick(article)}>
                {article.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 選択された記事がある場合は詳細を表示 */}
      {selectedArticle && (
        <div>
          <h2>{selectedArticle.title}</h2>
          <div>
            <img
              src={selectedArticle.eyecatch.url}
              alt={selectedArticle.title}
              width={selectedArticle.eyecatch.width}
              height={selectedArticle.eyecatch.height}
            />
          </div>
          <p>{selectedArticle.content}</p>
          <p>カテゴリー: {selectedArticle.category.name}</p>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
