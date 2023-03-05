import useToggle from "../hooks/useToggle";
import useSWR from "swr";
import { fetchPosts } from "../helpers/api";
import { useState } from "react";

export default function usePosts() {
  const [totalColumns, setTotalColumns] = useState(5);
  const [isOpen, toggleOpen] = useToggle();
  const {
    data: posts = { posts: [] },
    error,
    isLoading,
  } = useSWR("posts", fetchPosts);

  const changeColumns = (value) => setTotalColumns(value / 10);

  return {
    posts,
    totalColumns,
    changeColumns,
    isOpen,
    toggleOpen,
    isLoading,
    error,
  };
}
