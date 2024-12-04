const API_URL = "http://localhost:5000/api/posts";

export const getPosts = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createPost = async (post) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return response.json();
};
