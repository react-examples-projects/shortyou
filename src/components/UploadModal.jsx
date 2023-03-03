import axios from "axios";
import TagsInput from "./InputTags";
import ReactPlayer from "react-player";
import VideoPreviewPictures from "./VideoPreviewPictures";
import {
  Modal,
  Button,
  Input,
  FileInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { BiUpload } from "react-icons/bi";
import { useState } from "react";

function UploadModal({ isOpen, toggleOpen }) {
  const theme = useMantineTheme();
  const [videoFile, setVideoFile] = useState(null);
  const [previewVideo, setPreviewVideo] = useState("");
  const [previewPicture, setPreviewPicture] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

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
  };

  const onChangePreviewPicture = (preview) => setPreviewPicture(preview);

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

        <VideoPreviewPictures
          onChangePreviewPicture={onChangePreviewPicture}
          videoFile={videoFile}
        />

        {previewVideo && (
          <div className="mt-3">
            <label
              htmlFor=""
              className="d-block mb-2"
              style={{ fontSize: "14px" }}
            >
              Preview video
            </label>
            <div className="player-wrapper">
              <ReactPlayer
                url={previewVideo}
                className="d-block w-100 react-player rounded-2"
                width="100%"
                height="100%"
                controls
                loop
              >
                Tu navegador no admite el elemento <code>video</code>.
              </ReactPlayer>
            </div>
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
