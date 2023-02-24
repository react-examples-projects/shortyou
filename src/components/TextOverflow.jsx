import { Text } from "@mantine/core"
import { getShortText } from "../helpers/utils"

export default function TextOverflow({ text, maxLength, ...props }) {
  const _text = getShortText(text, maxLength)
  return <Text {...props}>{_text}</Text>
}
