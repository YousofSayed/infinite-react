import { inputTypes } from "../constants/constants";

/**
 *
 * @param {{editor : import('grapesjs').Editor}} param0
 */
export const Input = ({ editor }) => {
  editor.Components.addType("input", {
    model: {
      defaults: {
        tagName: "input",
        attributes: {
          type: "text",
          name: "default-name",
          placeholder: "Insert text here",
        },
        traits: [
          {
            name: "type",
            label: "select type",
            type: "select",
            options: inputTypes.map((type) => ({ id: type, label: type })),
          },
          {
            id: "id",
            name: "id",
            type: "text",
          },
        ],
      },
    },
    
    
  });
};
