import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import { useState, useEffect, useRef } from "react";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { fileToBase64 } from "../helpers/utils";
import { Box, Text, Skeleton, Alert, Code } from "@mantine/core";
import cls from "classnames";
const noop = () => undefined;

export default function VideoPreviewPictures({
  videoFile,
  destroy = false,
  onChangePreviewPicture = noop,
  onChangePreviewPictures = noop,
  ...props
}) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewPictures, setPreviewPictures] = useState([]);
  const [prevewPicture, setPreviewPicture] = useState("");
  const [customPreviewPicture, setCustomPreviewPicture] = useState("");
  const inputFileRef = useRef(null);

  const onChangeCustomPreviewPicture = async (e) => {
    const file = e.target.files[0];
    const img = await fileToBase64(file);
    setCustomPreviewPicture(img);
    onChangePreviewPicture(img);
  };

  const _onChangePreviewPicture = (previewPic) => {
    console.log({ previewPic });
    onChangePreviewPicture(previewPic);
    setPreviewPicture(previewPic);
  };

  const deleteImage = () => {
    setCustomPreviewPicture("");
    inputFileRef.current.value = null;
  };

  useEffect(() => {
    if (destroy) setPreviewPictures([]);
  }, [destroy]);

  useEffect(() => {
    (async () => {
      if (!videoFile) return;
      try {
        setLoading(true);
        const previewPictures = await generateVideoThumbnails(videoFile, 3);
        setPreviewPictures(previewPictures);
        onChangePreviewPictures(previewPictures);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [videoFile]);

  return (
    <Box className="w-100" {...props}>
      <label htmlFor="" style={{ fontSize: "14px" }}>
        Post preview
      </label>

      {previewPictures.length < 1 && !isLoading && !error && (
        <Alert title="Select a video" className="my-2">
          Please, select a video to generate the previews thumbails
        </Alert>
      )}

      {error && (
        <Alert title="Somenthing went wrong" className="my-2">
          <Text>Somenthing went wrong while generating the previews.</Text>
          <Text className="mt-2">
            <Code>Error code: {error.toString()}</Code>
          </Text>
        </Alert>
      )}

      {!customPreviewPicture ? (
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
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="preview-image"
                    height="250px"
                    sx={{
                      cursor: "default",
                      flex: "1 0  calc((500px / 4) + 2rem)",
                    }}
                  />
                ))
            : previewPictures.map((previewPic, index) => (
                <img
                  key={index}
                  src={previewPic}
                  onClick={() => _onChangePreviewPicture(previewPic)}
                  className={cls("preview-image", {
                    selected: prevewPicture === previewPic,
                  })}
                  alt="Preview picture for the video"
                />
              ))}
        </Box>
      ) : (
        <>
          <img
            src={customPreviewPicture}
            className="w-100 d-block mx-auto rounded-2 mt-2"
            alt="Custom preview image for you video"
            title="Custom preview image for you video"
            style={{ objectFit: "cover" }}
          />
          <Text
            c="red.5"
            td="underline"
            fz="xs"
            className="d-flex align-items-center mt-2"
            sx={{ cursor: "pointer", maxWidth: "max-content" }}
            title="Delete selected image"
            onClick={deleteImage}
          >
            <AiOutlineDelete
              className="me-1"
              style={{ fontSize: "14px", marginTop: "3px" }}
            />
            Delete image
          </Text>
        </>
      )}

      <Text
        c="blue.5"
        td="underline"
        fz="xs"
        className="d-inline-flex align-items-center mt-2"
        sx={{ cursor: "pointer" }}
        title="Choose an image and upload it as video preview"
        onClick={() => inputFileRef.current.click?.()}
      >
        <AiOutlineCloudUpload
          className="me-1"
          style={{ fontSize: "14px", marginTop: "3px" }}
        />
        Upload your custom preview
      </Text>
      <input
        type="file"
        accept="image/*"
        className="d-none"
        onChange={onChangeCustomPreviewPicture}
        ref={inputFileRef}
      />
    </Box>
  );
}
