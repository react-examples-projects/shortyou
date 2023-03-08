import TagsInput from "./InputTags";
import ReactPlayer from "react-player";
import useFormValidation from "../hooks/useFormValidation";
import usePostCreate from "../hooks/usePostCreate";
import VideoPreviewPictures from "./VideoPreviewPictures";
import { postSchema } from "../helpers/schema";
import { toast } from "react-toastify";
import {
  toFormDataObj,
  isNotValidFileType,
  isFileTooLarge,
  getError,
  base64ToFile,
} from "../helpers/utils";
import { BiUpload } from "react-icons/bi";
import { useState } from "react";
import {
  Modal,
  Button,
  Alert,
  Input,
  FileInput,
  Textarea,
  Text,
  useMantineTheme,
  Code,
} from "@mantine/core";

function UploadModal({ isOpen, toggleOpen, addPost }) {
  const theme = useMantineTheme();
  const { errors, reset, handleSubmit, register } =
    useFormValidation(postSchema);
  const { create, isLoading, error } = usePostCreate();
  const [videoFile, setVideoFile] = useState(null);
  const [previewVideo, setPreviewVideo] = useState("");
  const [previewPicture, setPreviewPicture] = useState("");
  const [previewPictures, setPreviewPictures] = useState([]);
  const [tags, setTags] = useState([]);
  const [errorFile, setErrorFile] = useState(null);

  const onChangeTags = (tags) => setTags(tags);

  const onSubmit = async (e) => {
    try {
      if (!videoFile) return setErrorFile("The video is required");
      setErrorFile(null);
      const preview = previewPicture || previewPictures[0];
      const original = await base64ToFile(preview);
      console.log({ original });
      const fd = toFormDataObj({
        ...e,
        tags: tags.length ? tags.map((t) => t.text) : [],
      });

      fd.append("file", videoFile);
      fd.append("original", original);

      const post = await create(fd);
      addPost(post);
      reset();
      setTags([]);
      setVideoFile(null);
      setPreviewVideo("");
      setPreviewPicture("");
      setPreviewPictures([]);
      toggleOpen();
      toast.success("Post has been created");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const onChangeFile = async (file) => {
    try {
      if (isNotValidFileType(file.type)) {
        throw new Error("The file type is not valid");
      }

      if (isFileTooLarge(file)) {
        throw new Error("The file is too large to process it");
      }
      setErrorFile(null);
      const preview = URL.createObjectURL(file);
      setVideoFile(file);
      setPreviewVideo(preview);
    } catch (err) {
      setVideoFile(null);
      setErrorFile(err.message);
    }
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
            disabled={isLoading}
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
          disabled={isLoading}
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

          <Text c="dimmed" fz="xs" className="my-1">
            Press <Code>ENTER</Code> to add a tag
          </Text>

          <TagsInput
            onChangeTags={onChangeTags}
            id="tags"
            placeholder="Your awesome tags"
            disabled={isLoading}
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
            value={videoFile}
            onChange={onChangeFile}
            error={errorFile}
            disabled={isLoading}
            required
          />
        </div>

        {!errorFile && (
          <VideoPreviewPictures
            onChangePreviewPicture={onChangePreviewPicture}
            onChangePreviewPictures={onChangePreviewPictures}
            videoFile={videoFile}
            destroy={videoFile === null}
          />
        )}

        {previewVideo && !errorFile && (
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

        {error && (
          <Alert title="Something went wrong" color="red" className="my-3">
            {getError(error)}
          </Alert>
        )}

        <Button
          color="green"
          type="submit"
          className="mt-3"
          loading={isLoading}
          disabled={
            isLoading ||
            previewPictures.length < 1 ||
            Object.keys(errors).length
          }
          fullWidth
        >
          Create Post
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;
