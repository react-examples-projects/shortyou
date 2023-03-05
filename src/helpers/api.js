import axios from "axios";

export const fetchPosts = async (args) => {
  const res = await axios.get(args);
  const posts = res.data?.data;
  return posts;
};
