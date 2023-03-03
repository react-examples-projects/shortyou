import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import { useState, useEffect } from "react";
import { Box } from "@mantine/core";
import cls from "classnames";
const noop = () => undefined;

export default function VideoPreviewPictures({
  videoFile,
  onChangePreviewPicture = noop,
  onChangePreviewPictures = noop,
}) {
  const [previewPictures, setPreviewPictures] = useState([]);

  useEffect(() => {
    (async () => {
      if (!videoFile) return;

      const previewPictures = await generateVideoThumbnails(videoFile, 3);
      setPreviewPictures(previewPictures);
      onChangePreviewPictures(previewPictures);
    })();
  }, [videoFile]);

  if (previewPictures.length < 0) return null;

  return (
    <div className="w-100">
      <label htmlFor="" style={{ fontSize: "14px" }}>
        Post preview
      </label>
      <Box
        className="d-flex justify-content-between w-100 gap-2 mt-2 pb-2"
        sx={{
          maxWidth: "500px",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#555",
            borderRadius: "4px",
          },
        }}
      >
        {previewPictures.map((previewPic, index) => (
          <img
            key={index}
            src={previewPic}
            onClick={() => onChangePreviewPicture(previewPic)}
            className={cls("preview-image", {
              selected: false,
            })}
            alt="Preview picture for the video"
          />
        ))}
      </Box>
    </div>
  );
}
