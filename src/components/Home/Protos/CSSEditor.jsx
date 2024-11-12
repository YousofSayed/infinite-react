import { useEditorMaybe } from "@grapesjs/react";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { Loader } from "../../Loader";

export const CSSEditor = () => {    
  return (
    <section className="mt-3 rounded-lg  overflow-hidden min-h-[400px]">
      <Editor className="h-full " height={'400px'}  language="css" theme="vs-dark" loading={<Loader/>} ></Editor>
    </section>
  );
};
