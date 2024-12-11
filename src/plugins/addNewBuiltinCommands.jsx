import React from "react";
import { AssetsManager } from "../components/Home/AssetsManager";
import { ErrorModal } from "../components/Home/Modals/ErrorModal";
import { PagesManager } from "../components/Home/Modals/PagesManager";

/**
 *
 * @param {import('grapesjs').Editor} editor
 * @returns
 */
export const addNewBuiltinCommands = (editor) => {
  editor.Commands.add("open:files-manager", (editor, sender, options) => {
    editor.runCommand("open:custom:modal", {
      title: "Files Manager",
      JSXModal: <AssetsManager editor={editor} />,
    });
  });

  editor.Commands.add("open:pages-manager", (editor, sender, options) => {
    editor.runCommand("open:custom:modal", {
      title: "Pages Manager",
      JSXModal: <PagesManager />,
    });
  });

  editor.Commands.add("open:symbols-manager", (editor, sender, options) => {
    editor.runCommand("open:symbols:model");
  });

  editor.Commands.add("open:error:modal", (editor, sender, options) => {
    editor.runCommand("open:custom:modal", {
      title: options.errMsg,
      JSXModal: <ErrorModal>{options.content}</ErrorModal>,
    });
  });

  editor.Commands.add("close:current:modal", (editor, sender, options) => {
    editor.runCommand("close:custom:modal");
  });
};
