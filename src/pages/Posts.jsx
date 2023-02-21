import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

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
        }
        columnIndex++;
      }

      setPosts(posts);
      setColumns(columns);
    }
    fetchPosts();
  }, []);

  return (
    <div className="mt-5  ">
      {posts.length > 0 && (
        <div className="posts">
          {
            Object.entries(columns)?.map(([index, posts]) => (
              <div className="post-item">
                {posts?.map(({ url, width, height, _id }) => (
                  <ReactPlayer
                    id={_id}
                    key={_id}
                    url={url}
                    preload="metadata"
                    className="post"
                    controls
                    loop
                  >
                    Tu navegador no admite el elemento <code>video</code>.
                  </ReactPlayer>
                ))}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}
