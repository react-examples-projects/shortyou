import useToggle from "../hooks/useToggle";
import useSWR from "swr";
import { fetchPosts } from "../helpers/api";
import { useState } from "react";

export default function usePosts() {
  const [totalColumns, setTotalColumns] = useState(5);
  const [isOpen, toggleOpen] = useToggle();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [data, setData] = useState({ posts: [] });
  const hasMore = totalPages !== page;

  const { error, isLoading } = useSWR(
    "http://localhost:5000/api/post?page=" + page,
    fetchPosts,
    {
      onSuccess(data) {
        setTotalPages(data.totalPages);
        setData((prev) => ({
          ...prev,
          ...data,
          posts: [...prev.posts, ...data.posts],
        }));
      },
    }
  );

  const changeColumns = (value) => setTotalColumns(value / 10);

  const fetchMorePosts = () => setPage((prev) => prev + 1);

  return {
    data,
    hasMore,
    totalColumns,
    changeColumns,
    fetchMorePosts,
    isOpen,
    toggleOpen,
    isLoading,
    error,
  };
}
