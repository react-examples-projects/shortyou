import { Box } from "@mantine/core";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoPlayerPost from "./VideoPlayerPost";

const noop = () => [];

export default function PostList({
  posts,
  totalColumns,
  fetchMorePosts = noop,
  children,
  ...props
}) {
  return (
    <Box className="w-100" {...props}>
      {posts.length > 0 && (
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={fetchMorePosts}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <ResponsiveMasonry
            className="mt-4 "
            columnsCountBreakPoints={{
              520: 1,
              750: 2,
              960: 3,
              1200: totalColumns,
            }}
          >
            <Masonry gutter="8px">
              {posts.map((post) => (
                <article key={post._id}>
                  <VideoPlayerPost {...post} />
                </article>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      )}

      {/* [!] avoid prop drilling*/}
      {children}
    </Box>
  );
}