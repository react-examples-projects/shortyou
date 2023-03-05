import axios from "axios";
import TagsInput from "./InputTags";
import ReactPlayer from "react-player";
import useFormValidation from "../hooks/useFormValidation";
import VideoPreviewPictures from "./VideoPreviewPictures";
import { postSchema } from "../helpers/schema";
import { toFormDataObj } from "../helpers/utils";
import { BiUpload } from "react-icons/bi";
import { useState } from "react";
import {
  Modal,
  Button,
  Input,
  FileInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";

function UploadModal({ isOpen, toggleOpen }) {
  const theme = useMantineTheme();
  const { errors, reset, handleSubmit, register } =
    useFormValidation(postSchema);
  const [videoFile, setVideoFile] = useState(null);
  const [previewVideo, setPreviewVideo] = useState("");
  const [previewPicture, setPreviewPicture] = useState("");
  const [previewPictures, setPreviewPictures] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const onChangeTags = (tags) => setTags(tags);

  const onSubmit = async (e) => {
    const fd = toFormDataObj({ ...e, tags });
    if (previewPicture) {
      fd.append("original", previewPicture);
    } else {
      fd.append("original", previewPictures[0]);
    }
    const res = await axios.post("http://localhost:5000/api/post", fd);
    const post = res.data?.data;
  };

  const onChangeFile = async (file) => {
    const preview = URL.createObjectURL(file);
    setVideoFile(file);
    setPreviewVideo(preview);
  };

  const onChangePreviewPicture = (preview) => setPreviewPicture(preview);
  const onChangePreviewPictures = (previews) => setPreviewPictures(previews);

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
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Input.Wrapper
          id="title"
          label="Title Post"
          error={errors.title?.message}
          required
        >
          <Input
            {...register("title")}
            name="title"
            id="title"
            placeholder="Your awesome title"
            className="mt-2 mb-3"
          />
        </Input.Wrapper>

        <Textarea
          {...register("description")}
          placeholder="Your awesome description"
          label="Post description"
          labelProps={{ mb: "0.5rem" }}
          className="mb-3"
          name="description"
          id="description"
          maxRows={8}
          minRows={6}
          error={errors.description?.message}
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
          onChangePreviewPictures={onChangePreviewPictures}
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
