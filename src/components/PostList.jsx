import { Box, Alert, Text, Code } from "@mantine/core";
import { BiX } from "react-icons/bi";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import VideoPlayerPost from "./VideoPlayerPost";
import PostListLoader from "./PostListLoader";

export default function PostList({
  posts,
  totalColumns,
  children,
  isLoading,
  error,
  ...props
}) {
  if (error) {
    return (
      <Alert
        icon={<BiX style={{ fontSize: "1.5rem" }} />}
        title="Error while fetching posts"
        color="red"
        className="mt-4"
      >
        <Text>
          Something went wrong while fetching the posts from server. Refetch the
          browser o contact us.
        </Text>

        <Text className="mt-2">
          <Code>Error code: {error.toString()}</Code>
        </Text>
      </Alert>
    );
  }
  if (isLoading) {
    return <PostListLoader totalColumns={totalColumns} />;
  }

  return (
    <Box className="w-100" {...props}>
      {posts.length > 0 && (
        <ResponsiveMasonry
          className="mt-4 "
          columnsCountBreakPoints={{
            520: 1,
            750: 2,
            960: 3,
            1200: totalColumns,
          }}
        >
          <Masonry gutter="10px">
            {posts.map((post) => (
              <article key={post._id} id={"post_" + post._id}>
                <VideoPlayerPost {...post} />
              </article>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}

      {/* [!] avoid prop drilling*/}
      {children}
    </Box>
  );
}
