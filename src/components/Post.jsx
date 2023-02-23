import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import useLazyloadImage from "../hooks/useLazyloadImage";
import cls from "classnames";

const Wrapper = ({ url, _id, preview }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [isVisiblePreviewPicture, setVisiblePreviewPicture] = useState(true);

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

  const { ref, loadedResource } = useLazyloadImage(preview.original.url);
  const refPreview = useRef(null);
  return (
    <div
      onMouseEnter={onMousehover}
      onMouseLeave={onMouseLeave}
      className="position-relative w-100 mb-2"
      style={{
        cursor: "pointer",
      }}
    >
      <div
        className="position-relative overflow-hidden"
        style={{ zIndex: isVisiblePreviewPicture ? 1 : -1 }}
        ref={refPreview}
      >
        <img
          src={loadedResource || preview.thumbail.url}
          className={cls("w-100 h-100 img-fluid", {
            loaded: !!loadedResource,
          })}
          style={{
            borderRadius: "8px",
            filter: "blur(1px)",
            marginTop: "-1px",
            objectFit: "cover",
            height: `calc(${preview.original.height}px)`,
          }}
          ref={ref}
        />
      </div>

      <ReactPlayer
        id={_id}
        key={_id}
        url={url}
        className="post position-absolute top-0"
        playing={isPlaying}
        controls={false}
        muted
        loop
      >
        Tu navegador no admite el elemento <code>video</code>.
      </ReactPlayer>
    </div>
  );
};

export default function Post({ posts }) {
  return (
    <article className="post-item">
      {posts?.map((post) => (
        <Wrapper {...post} />
      ))}
    </article>
  );
}
