import axios from "axios";

export const fetchPosts = async () => {
  const res = await axios.get("http://localhost:5000/api/post");
  const posts = res.data?.data;
  return posts;
};
