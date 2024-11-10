import React from "react";
import { createSymbolTool } from "./tools/createSymbolTool";
import { createReusableCmpTool } from "./tools/createReusableCmpTool";


/**
 *
 * @param {import('grapesjs').Editor} editor
 * @returns
 */
export const addNewTools = (editor) => {
  editor.on("component:selected", (args) => {
    createSymbolTool(editor);
    createReusableCmpTool(editor);
  });
};
