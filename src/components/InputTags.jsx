import { useState, useEffect } from "react";
import { generateId } from "../helpers/utils";
import { Input, Badge, Box, ActionIcon } from "@mantine/core";
import { BiX, BiHash } from "react-icons/bi";

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
      {tags.map((tag) => {
        const removeButton = (
          <ActionIcon
            size="xs"
            color="blue"
            radius="xl"
            variant="transparent"
            onClick={() => removeTag(tag.id)}
          >
            <BiX />
          </ActionIcon>
        );
        return (
          <Badge
            color="gray"
            size="md"
            radius="xs"
            variant="filled"
            key={tag.id}
            className=""
            rightSection={removeButton}
            {...tagProps}
          >
            {tag.text}
          </Badge>
        );
      })}

      <Box className="d-block w-100">
        <Input
          onKeyDown={handleKeyDown}
          type="text"
          className="tags-input"
          placeholder="Type somthing"
          icon={<BiHash />}
          {...inputProps}
        />
      </Box>
    </div>
  );
}

export default TagsInput;
