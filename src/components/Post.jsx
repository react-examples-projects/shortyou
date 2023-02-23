import { useState } from "react";
import ReactPlayer from "react-player";
import useLazyloadImage from "../hooks/useLazyloadImage";
import cls from "classnames";

export default function Post({ posts }) {
  const Wrapper = ({ children, poster }) => {
    const [isVisiblePreviewPicture, setVisiblePreviewPicture] = useState(true);
    const { ref, loadedResource } = useLazyloadImage(poster.original.url);

    const onMousehover = () => setVisiblePreviewPicture(false);
    const onMouseLeave = () => setVisiblePreviewPicture(true);

    return (
      <div
        // onMouseEnter={onMousehover}
        // onMouseLeave={onMouseLeave}
        onmous
        className="position-relative w-100 mb-2"
        style={{
          cursor: "pointer",
          // width: `calc(${poster.original.width}px)`,
          // height: `calc(${poster.original.height}px)`,
        }}
      >
        {isVisiblePreviewPicture && (
          <div className="w-100 overflow-hidden" style={{ zIndex: 1 }}>
            <img
              src={loadedResource || poster.thumbail.url}
              className={cls("w-100 h-100 img-fluid", {
                loaded: !!loadedResource,
              })}
              style={{
                borderRadius: "8px",
                filter: "blur(1px)",
                marginTop: "-1px",
                objectFit: "cover",
                height: `calc(${poster.original.height}px)`,
              }}
              ref={ref}
            />
          </div>
        )}
        {children}
      </div>
    );
  };

  return (
    <article className="post-item">
      {posts?.map(({ url, width, height, _id, preview }) => (
        <Wrapper poster={preview}>
          {/* <ReactPlayer
            id={_id}
            key={_id}
            url={url}
            preload="metadata"
            className="post"
            height={height}
            controls
            loop
          >
            Tu navegador no admite el elemento <code>video</code>.
          </ReactPlayer> */}
        </Wrapper>
      ))}
    </article>
  );
}
