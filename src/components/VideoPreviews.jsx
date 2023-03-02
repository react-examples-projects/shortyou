import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import { Box } from "@mantine/core";
import { useState } from "react";

export default function VideoPreviews() {
  const [previewPicture, setPreviewPicture] = useState("");
  const [previewPictures, setPreviewPictures] = useState([]);

  const onChangeFile = async (file) => {
    const preview = URL.createObjectURL(file);
    setVideoFile(file);
    setPreviewVideo(preview);

    const previewPictures = await generateVideoThumbnails(file, 3);
    setPreviewPictures(previewPictures);
  };

  const onChangePreviewPicture = (preview) => {
    setPreviewPicture(preview);
  };

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
        {previewPictures.map((previewPic) => (
          <img
            src={previewPic}
            onClick={() => onChangePreviewPicture(previewPic)}
            style={{
              objectFit: "cover",
              width: "100%",
              maxWidth: "calc(500px / 4)",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            alt="Preview picture for the video"
          />
        ))}
      </Box>
    </div>
  );
}
