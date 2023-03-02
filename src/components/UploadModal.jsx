import axios from "axios";
import TagsInput from "./InputTags";
import ReactPlayer from "react-player";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import {
  Modal,
  Button,
  Input,
  FileInput,
  Textarea,
  useMantineTheme,
  Box,
} from "@mantine/core";
import { BiUpload } from "react-icons/bi";
import { useState } from "react";

function UploadModal({ isOpen, toggleOpen }) {
  const theme = useMantineTheme();
  const [videoFile, setVideoFile] = useState(null);
  const [previewVideo, setPreviewVideo] = useState("");
  const [previewPicture, setPreviewPicture] = useState("");
  const [previewPictures, setPreviewPictures] = useState([]);
  const [tags, setTags] = useState([]);

  const onChangeTags = (tags) => setTags(tags);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("original", previewPicture);
    for (const tag of tags) fd.append("tags", tag.text);

    const res = await axios.post("http://localhost:5000/api/post", fd);
    const post = res.data?.data;
  };

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
    <Modal
      opened={isOpen}
      onClose={toggleOpen}
      title="Upload post"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={2}
      centered
    >
      <form autoComplete="off" onSubmit={onSubmit}>
        <Input.Wrapper id="title" label="Title Post" required>
          <Input
            name="title"
            id="title"
            placeholder="Your awesome title"
            className="mt-2 mb-3"
            required
          />
        </Input.Wrapper>

        <Textarea
          placeholder="Your awesome description"
          label="Post description"
          labelProps={{ mb: "0.5rem" }}
          className="mb-3"
          name="description"
          id="description"
          maxRows={8}
          minRows={6}
          required
        />

        <div className="mb-3">
          <label
            htmlFor="tags"
            style={{ fontSize: "14px" }}
            className="d-block mb-2"
          >
            Tags post
          </label>
          <TagsInput
            onChangeTags={onChangeTags}
            id="tags"
            placeholder="Your awesome tags"
          />
        </div>

        <div className="mb-3">
          <FileInput
            label="Video file (max 10mb)"
            labelProps={{ mb: "0.5rem" }}
            placeholder="Upload your video"
            icon={<BiUpload />}
            accept="video/mp4,video/webm"
            name="file"
            id="file"
            onChange={onChangeFile}
            required
          />
        </div>

        {previewPictures.length > 0 && (
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
        )}

        {previewVideo && (
          <div className="mt-3">
            <label
              htmlFor=""
              className="d-block mb-2"
              style={{ fontSize: "14px" }}
            >
              Preview video
            </label>
            
            <ReactPlayer
              url={previewVideo}
              className="d-block w-100"
              style={{
                aspectRatio: "16 / 9",
                maxWidth: "400px",
                maxHeight: "400px",
                borderRadius: "5px",
              }}
              controls
              loop
            >
              Tu navegador no admite el elemento <code>video</code>.
            </ReactPlayer>
          </div>
        )}

        <Button color="green" type="submit" className="mt-3" fullWidth>
          Create Post
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;
