import axios from "axios";
import TagsInput from "./InputTags";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
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
          <label htmlFor="tags" style={{ fontSize: "14px" }}>
            Tags post
          </label>
          <TagsInput
            onChangeTags={onChangeTags}
            id="tags"
            placeholder="Your awesome tags"
          />
        </div>

        <div>
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
          <div>
            <label htmlFor="">Post preview</label>
            <div
              className="d-flex justify-content-between gap-2"
              style={{ maxWidth: "500px" }}
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
            </div>
          </div>
        )}

        {previewVideo && (
          <div>
            <label htmlFor="" className="d-block">
              Preview video
            </label>
            <video
              src={previewVideo}
              style={{
                aspectRatio: "16 / 9",
                maxWidth: "400px",
                maxHeight: "400px",
                borderRadius: "5px",
              }}
              loop
              controls
            />
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
