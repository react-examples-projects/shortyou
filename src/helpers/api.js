import axios from "axios";

const API_HOST = "https://shortyou-api.vercel.app/api/";//"http://localhost:5000/api/"; //

export const fetchPosts = async () => {
  const res = await axios.get(API_HOST + "post");
  const posts = res.data?.data;
  return posts;
};

export const createPost = async (fd) => {
  const res = await axios.post(API_HOST + "post", fd);
  const post = res.data?.data;
  return post;
};

export const searchPosts = async (search) => {
  const res = await axios.get(API_HOST + "search?query=" + search);
  const posts = res.data?.data;
  return posts;
};