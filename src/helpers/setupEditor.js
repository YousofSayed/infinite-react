import EditorJS from "@editorjs/editorjs";
import { Input } from "../Blocks/Input";
import { Container } from "../Blocks/Container";
import { blocks } from "../Blocks/Blocks";
import { Text } from "../Blocks/Text";

/**
 *
 * @param {string} holder
 * @returns
 */
export const setupEditor = (holder) => {
  return new EditorJS({
    holder,

    autofocus: true,
    placeholder: "Let’s build our website 💙",
    tools: { ...blocks, container: Container },
    defaultBlock:'myText'
  });
};
