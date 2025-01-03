// src/api/index.ts
export const fetchBlogPosts = async () => {
  const response = await fetch("http://localhost:3001/api/overview");
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  const data = await response.json();
  return data.contents;
};
