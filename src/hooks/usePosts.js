import useToggle from "../hooks/useToggle";
import useSWR from "swr";
import { fetchPosts, searchPosts as _searchPosts } from "../helpers/api";
import { useState, useEffect, useCallback } from "react";

export default function usePosts() {
  const [totalColumns, setTotalColumns] = useState(5);
  const [isOpen, toggleOpen] = useToggle();
  const [posts, setPosts] = useState([]);
  const [postsRender, setPostsRender] = useState([]);
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useSWR("posts", fetchPosts);

  const changeColumns = useCallback((value) => setTotalColumns(value / 10), []);

  const addPost = useCallback(
    (post) => setPosts((prev) => [post, ...prev]),
    []
  );

  const onChangeSearch = (e) => {
    const term = e.target.value.trim();
    if (!term) {
      setPosts(postsRender);
    }
    setSearch(e.target.value);
  };

  const searchPosts = useCallback(async () => {
    if (!search) return;

    const _posts = await _searchPosts(search);
    if (_posts?.length) setPosts(_posts);
  }, [search]);

  const clearSerach = () => {
    setSearch("");
    setPosts(postsRender);
  };

  useEffect(() => {
    if (data) {
      setPosts(data);
      setPostsRender(data);
    }
  }, [data]);

  return {
    posts,
    totalColumns,
    changeColumns,
    isOpen,
    toggleOpen,
    isLoading,
    addPost,
    error,
    search,
    onChangeSearch,
    searchPosts,
    clearSerach,
  };
}
