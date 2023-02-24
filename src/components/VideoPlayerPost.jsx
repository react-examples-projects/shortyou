import { useRef, useState } from "react";
import { getFormattedDistanceToNow } from "../helpers/utils";
import { Badge, Box, Loader } from "@mantine/core";
import ReactPlayer from "react-player";
import useLazyloadImage from "../hooks/useLazyloadImage";
import TextOverflow from "./TextOverflow";
import cls from "classnames";

const VideoPlayerPost = ({
  url,
  _id,
  preview,
  title,
  tags,
  description,
  createdAt,
}) => {
  console.log("VideoPlayerPost");
  const [isPlaying, setPlaying] = useState(false);
  const [isVisiblePreviewPicture, setVisiblePreviewPicture] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  const [isDownloadingBuffer, setDownloadingBuffer] = useState(false);

  const onMousehover = (e) => {
    e.stopPropagation();
    setPlaying(true);
    setVisiblePreviewPicture(false);
  };

  const onMouseLeave = (e) => {
    e.stopPropagation();
    setPlaying(false);
    setVisiblePreviewPicture(true);
  };

  const onBuffering = () => {
    setDownloadingBuffer(true);
    console.log("downloading buffer...");
  };

  const onBufferEnd = () => {
    setDownloadingBuffer(false);
    console.log("buffer finished");
  };

  const { ref, loadedResource } = useLazyloadImage(preview.original.url);
  const refPreview = useRef(null);
  return (
    <div
      onMouseEnter={onMousehover}
      onMouseLeave={onMouseLeave}
      className="position-relative w-100 mb-2"
      style={{
        cursor: "pointer",
      }}
    >
      <div
        className="position-relative overflow-hidden"
        style={{
          zIndex: isVisiblePreviewPicture && isLoaded ? 1 : -1,
          borderRadius: "8px",
        }}
        ref={refPreview}
      >
        <div
          className={cls("position-absolute w-100", {
            "d-none": !isVisiblePreviewPicture && !isLoaded,
          })}
          style={{
            zIndex: 3,
            height: "calc(100% + 5px)",
            borderRadius: "8px",
            top: 0,
            left: 0,
            bottom: 0,
            background:
              "linear-gradient(5deg,rgba(0, 0, 0, 0.938),rgba(33, 33, 33, 0.5), transparent)",
          }}
        />

        <img
          src={loadedResource || preview.thumbail.url}
          className={cls("position-relative w-100 h-100 img-fluid", {
            loaded: !!loadedResource,
          })}
          style={{
            borderRadius: "8px",
            filter: "blur(1px)",
            marginTop: "-1px",
            objectFit: "cover",
            top: "1px",
            zIndex: 2,
          }}
          ref={ref}
        />
        <div
          className="px-3 position-absolute w-100"
          style={{ bottom: "12px", zIndex: 4 }}
        >
          <TextOverflow
            fw={700}
            text={title}
            maxLength={60}
            sx={{ lineHeight: 1.2, fontSize: "14px" }}
            mb="0.5rem"
          />
          <TextOverflow
            style={{ fontSize: "13px" }}
            text={description}
            maxLength={70}
            c="dimmed"
          />

          {tags.filter(Boolean).length > 0 && (
            <Box
              mt="0.5rem"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                alignItems: "center",
              }}
            >
              {tags.filter(Boolean).map((tag, i) => (
                <Badge
                  color="gray"
                  size="xs"
                  variant="filled"
                  key={tag + "-" + i}
                  sx={{ fontWeight: 400, letterSpacing: "1px" }}
                >
                  #{tag}
                </Badge>
              ))}
            </Box>
          )}

          <time
            style={{ fontSize: "14px", marginTop: "0.5rem", display: "block" }}
          >
            {getFormattedDistanceToNow(createdAt)}
          </time>
        </div>
      </div>

      <ReactPlayer
        id={_id}
        key={_id}
        url={url}
        className="post position-absolute top-0"
        playing={isPlaying}
        onReady={() => setLoaded(true)}
        onBuffer={onBuffering}
        onBufferEnd={onBufferEnd}
        controls={false}
        muted
        loop
      >
        Tu navegador no admite el elemento <code>video</code>.
      </ReactPlayer>
      {isDownloadingBuffer && !isVisiblePreviewPicture && (
        <Loader
          size="md"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default VideoPlayerPost;
