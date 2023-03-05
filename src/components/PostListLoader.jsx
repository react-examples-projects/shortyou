import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { randomNumber } from "../helpers/utils";
import { Box, Skeleton } from "@mantine/core";
const cols = Array(20)
  .fill(0)
  .map((_) => randomNumber(200, 550));

export default function PostListLoader({ totalColumns }) {
  return (
    <ResponsiveMasonry
      className="mt-4 opacity-gradient"
      columnsCountBreakPoints={{
        520: 1,
        750: 2,
        960: 3,
        1200: totalColumns,
      }}
    >
      <Masonry gutter="10px">
        {cols.map((h, i) => (
          <Box
            key={i}
            className="w-100"
            sx={{
              height: h + "px",
            }}
          >
            <Skeleton width="100%" height="100%" animate radius="md" />
          </Box>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
