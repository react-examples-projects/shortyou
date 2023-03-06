import axios from "axios";

export const fetchPosts = async () => {
  const res = await axios.get("http://localhost:5000/api/post");
  const posts = res.data?.data;
  return posts;
};

export const createPost = async (fd) => {
  const res = await axios.post("http://localhost:5000/api/post", fd);
  const post = res.data?.data;
  return post;
};

export const searchPosts = async (search) => {
  const res = await axios.get(
    "http://localhost:5000/api/search?query=" + search
  );
  const posts = res.data?.data;
  return posts;
};
