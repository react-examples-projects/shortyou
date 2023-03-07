import { useState, memo } from "react";
import { getFormattedDistanceToNow } from "../helpers/utils";
import {
  Badge,
  Box,
  Loader,
  Skeleton,
  Modal,
  Text,
  Title,
  Flex,
} from "@mantine/core";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import ReactPlayer from "react-player";
import useLazyloadImage from "../hooks/useLazyloadImage";
import useToggle from "../hooks/useToggle";
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
  const [isVisibleModal, toggleVisibleModal] = useToggle();
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
    <>
      <Modal
        opened={isVisibleModal}
        onClose={toggleVisibleModal}
        title={
          <Title order={3} className="text-center">
            {title}
          </Title>
        }
        centered
      >
        <Text className="mb-3">{description}</Text>

        <Text size="sm" className="mb-3" c="dimmed">
          Upload by Anonymous, {getFormattedDistanceToNow(createdAt)}
        </Text>
        
        <Flex gap="xs" align="center" wrap="wrap" className="mb-3">
          {tags.map((tag, i) => {
            return (
              <Badge
                color="gray"
                size="md"
                radius="xs"
                variant="filled"
                key={i}
                className=""
              >
                {tag}
              </Badge>
            );
          })}
        </Flex>

        <Player poster={preview.original.url} src={url} playsInline>
          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton disabled />
          </ControlBar>
        </Player>
      </Modal>

      <div
        onClick={toggleVisibleModal}
        title="Click to see more"
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
              transform: "scale(1.1)",
              filter: "blur(4px)",
              marginTop: "-1px",
              objectFit: "cover",
              top: "1px",
              zIndex: 2,
              transition: "transform 400ms ease-out",
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
              style={{
                fontSize: "14px",
                marginTop: "0.5rem",
                display: "block",
              }}
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
    </>
  );
};

export default memo(VideoPlayerPost);
