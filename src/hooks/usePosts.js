import useToggle from "../hooks/useToggle";
import useSWR from "swr";
import { fetchPosts } from "../helpers/api";
import { useState } from "react";

export default function usePosts() {
  const { data: posts = [], error, isLoading } = useSWR("posts", fetchPosts);

  const [totalColumns, setTotalColumns] = useState(5);
  const [isOpen, toggleOpen] = useToggle();

  const changeColumns = (value) => setTotalColumns(value / 10);

  const fetchMorePosts = () => {
    return [];
  };

  return {
    posts,
    totalColumns,
    changeColumns,
    fetchMorePosts,
    isOpen,
    toggleOpen,
    isLoading,
    error,
  };
}
