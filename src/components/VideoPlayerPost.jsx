import { useState, memo } from "react";
import { getFormattedDistanceToNow } from "../helpers/utils";
import { Badge, Box, Loader, Skeleton } from "@mantine/core";
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
  height,
  createdAt,
}) => {
  const [isPlaying, setPlaying] = useState(false);
  const [isVisiblePreviewPicture, setVisiblePreviewPicture] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  const [isDownloadingBuffer, setDownloadingBuffer] = useState(false);
  const [isLoadedPreviewImg, setLoadedPreviewImg] = useState(false);
  const { ref, loadedResource } = useLazyloadImage(
    preview.original.url,
    isLoadedPreviewImg
  );

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

  return (
    <div
      title={title}
      onMouseEnter={onMousehover}
      onMouseLeave={onMouseLeave}
      className="position-relative w-100 overflow-hidden"
      style={{
        cursor: "pointer",
        borderRadius: "8px",
      }}
    >
      {!isLoadedPreviewImg && (
        <Skeleton
          height="100%"
          width="100%"
          radius="md"
          sx={{ zIndex: 5, position: "absolute", aspectRatio: "16 / 9" }}
        />
      )}
      <div
        className="d-flex flex-column position-relative"
        style={{
          zIndex: isVisiblePreviewPicture || !isPlaying ? 1 : -1,
        }}
      >
        <div
          className={cls("position-absolute w-100", {
            "d-none": !isVisiblePreviewPicture && !isLoaded,
          })}
          style={{
            zIndex: 3,
            height: "calc(100% + 5px)",
            top: 0,
            left: 0,
            bottom: 0,
            background:
              "linear-gradient(5deg,rgba(0, 0, 0, 0.938),rgba(33, 33, 33, 0.5), transparent)",
          }}
        />

        <img
          src={loadedResource || preview.thumbail.url}
          loading="lazy"
          ref={ref}
          onLoad={() => setLoadedPreviewImg(true)}
          className={cls("position-relative w-100 h-100 img-fluid", {
            loaded: !!loadedResource,
          })}
          alt={title}
          title={title}
          style={{
            filter: "blur(1px)",
            marginTop: "-1px",
            objectFit: "cover",
            top: "1px",
            zIndex: 2,
          }}
        />

        <div
          className="px-3 position-absolute w-100"
          style={{
            bottom: "12px",
            zIndex: isVisiblePreviewPicture || !isPlaying ? 4 : -1,
          }}
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
        url={loadedResource ? url : null}
        preload="none"
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

      {(isDownloadingBuffer || !isLoaded) && !isVisiblePreviewPicture && (
        <>
          {!isLoaded && (
            <Skeleton
              height="100%"
              width="100%"
              radius="md"
              sx={{
                zIndex: 5,
                position: "absolute",
                aspectRatio: "16 / 9",
                top: 0,
                left: 0,
              }}
            />
          )}
          <Loader
            size="md"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 6,
            }}
          />
        </>
      )}
    </div>
  );
};

export default memo(VideoPlayerPost);
