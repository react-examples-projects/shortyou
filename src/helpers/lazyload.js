export default function lazyLoad(image, cb = () => undefined) {
  function fn(entrie, observer) {
    const element = entrie[0]?.target;
    const source = element.getAttribute("data-src");
    if (entrie[0]?.isIntersecting && source) {;
      element.setAttribute("src", source);
      element.addEventListener("load", (e) => {
        element.classList.add("loaded");
        observer.unobserve(e.target);
        element.removeAttribute("data-src");
        cb(source);
      });
    }
  }

  if ("IntersectionObserver" in window) {
    const InObserver = new IntersectionObserver(fn);
    InObserver.observe(image);
  } else {
    console.error("IntersectionObserver no implemented this browser");
  }
}
