import { useState, useEffect } from "react";
import axios from "axios";
import TagsInput from "../components/InputTags";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";

export default function Create() {
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

  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setVideoFile(file);
    setPreviewVideo(preview);

    const previewPictures = await generateVideoThumbnails(file, 3);
    setPreviewPictures(previewPictures);
    console.log(previewPictures);
  };

  const onChangePreviewPicture = (preview) => {
    setPreviewPicture(preview);
  };

  return (
    <div className="App">
      <form autoComplete="off" onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title post</label>
          <input
            name="title"
            id="title"
            placeholder="Your awesome title"
            required
          />
        </div>

        <div>
          <label htmlFor="description">Title post</label>
          <input
            name="description"
            id="description"
            placeholder="Your awesome description"
            required
          />
        </div>

        <div>
          <label htmlFor="tags">Tags post</label>
          <TagsInput
            onChangeTags={onChangeTags}
            id="tags"
            placeholder="Your awesome tags"
          />
        </div>

        <div>
          <label htmlFor="file">Video file (max 10mb)</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={onChangeFile}
            accept="video/mp4,video/webm"
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
        <button type="submit">Create post</button>
      </form>
    </div>
  );
}
