import { useEffect, useRef, useState } from "react";
import lazyLoad from "../helpers/lazyload";
/**
 * Show an image loader placeholder and replace when it's been loaded
 * @param {String} src The original source url
 * @returns {String} The image url
 */
export default function useLazyloadImage(src, isLoadedPreviewImg) {
  const imgNodeRef = useRef(null);
  const [loadedResource, setLoadedResource] = useState(null);
  useEffect(() => {
    if (imgNodeRef.current && isLoadedPreviewImg) {
      imgNodeRef.current.setAttribute("data-src", src);
      lazyLoad(imgNodeRef.current, (url) => setLoadedResource(url));
    }
  }, [src, isLoadedPreviewImg]);

  return { ref: imgNodeRef, loadedResource };
}
