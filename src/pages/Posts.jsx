import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell, Navbar, Header } from "@mantine/core";

import axios from "axios";
import Post from "../components/Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [columns, setColumns] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      let columnIndex = 0;
      let columnsCount = 5;
      let columns = {};
      const res = await axios.get("http://localhost:5000/api/post");
      const posts = res.data?.data;

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        columns[columnIndex] = columns[columnIndex]
          ? [...columns[columnIndex], post]
          : [post];

        if (columnIndex === columnsCount - 1) {
          columnIndex = 0;
        } else {
          columnIndex++;
        }
      }

      setPosts(posts);
      setColumns(columns);
    }
    fetchPosts();
  }, []);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 200 }} p="xs" sx={{ background: "transparent" }}>
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <main className="mt-3 px-2">
        <Link to="/create" className="d-block mb-5">
          Create new post
        </Link>
        {posts.length > 0 && (
          <section className="posts">
            {Object.entries(columns)?.map(([, posts]) => (
              <Post posts={posts} />
            ))}
          </section>
        )}
      </main>
    </AppShell>
  );
}
