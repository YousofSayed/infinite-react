import React from "react";
import { addItemInToolBarForEditor } from "../../helpers/functions";
import { ReusableSympol } from "../../components/Home/Modals/ReusableSympol";
import { editorIcons } from "../../components/Icons/editorIcons";

export const createSymbolTool = (editor) => {
  addItemInToolBarForEditor({
    commandCallback: (ed) => {
      ed.runCommand("open:custom:modal", {
        title: `Create Sympol (Global Component)`,
        JSXModal: <ReusableSympol editor={ed} />,
      });
    },
    label: editorIcons.reuseable,
    commandName: "open:symbols:model",
    editor: editor,
  });
};
