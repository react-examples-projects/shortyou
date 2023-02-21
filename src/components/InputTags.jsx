import { useState, useEffect } from "react";
import { generateId } from "../helpers/utils";
const noop = () => undefined;

function TagsInput({
  onChangeTags = noop,
  containerProps,
  tagProps,
  ...inputProps
}) {
  const [tags, setTags] = useState([]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    const text = e.target.value;

    if (!text.trim()) return;
    const id = generateId();

    setTags((prev) => [{ text, id }, ...prev]);
    e.target.value = "";
  }

  function removeTag(id) {
    setTags(tags.filter((tag) => tag.id !== id));
  }

  useEffect(() => {
    onChangeTags(tags);
  }, [tags]);

  return (
    <div className="tags-input-container" {...containerProps}>
      {tags.map((tag) => (
        <div className="tag-item" key={tag.id} {...tagProps}>
          <span className="text">{tag.text}</span>
          <span className="close" onClick={() => removeTag(tag.id)}>
            &times;
          </span>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="tags-input"
        placeholder="Type somthing"
        {...inputProps}
      />
    </div>
  );
}

export default TagsInput;
