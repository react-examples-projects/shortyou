import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [columns, setColumns] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      let columnIndex = 0;
      let columnsCount = 4;
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
    <main
      className="mt-5 mx-auto px-2"
      style={{ maxWidth: "1300px", width: "100%" }}
    >
      {posts.length > 0 && (
        <section className="posts">
          {Object.entries(columns)?.map(([, posts]) => (
            <Post posts={posts} />
          ))}
        </section>
      )}
    </main>
  );
}
