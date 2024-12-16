import React, { useEffect, useState } from "react";
import { Select } from "./Protos/Select";
import { useEditorMaybe } from "@grapesjs/react";
import { Icons } from "../Icons/Icons";

export const PagesSelector = () => {
  const editor = useEditorMaybe();
  const [pages, setPages] = useState([]);
  const [pageName, setPageName] = useState("");

  const navigateToAnotherPage = (pageId) => {
    // editor.DomComponents.clear()
    editor.Pages.select(editor.Pages.get(pageId), {
      avoidStore: true,
      partial: false,
      avoidTransformers: false,
      // silent:true
    });
    setPageName(editor.Pages.getSelected().id);
  };

  useEffect(() => {
    if (!editor) return;
    setPages(editor.Pages.getAll().map((page) => page.id));
    setPageName(editor.Pages.getSelected().id);
  }, [editor]);

  useEffect(() => {
    if(!editor)return;
    const pageUpdateCallback = () =>
      setPages(editor.Pages.getAll().map((page) => page.id));
    editor.on("page", pageUpdateCallback);

    return () => {
      editor.off("page", pageUpdateCallback);
    };
  });

  return (
    <Select
      icon={Icons.stNote()}
      className=" bg-gray-800 max-w-[30%] h-[calc(100%-15px)] "
      containerClassName="bg-gray-800"
      preventInput={true}
      keywords={pages}
      value={pageName}
      // onMenuOpen={({ setKeywords }) => {
      //   setPages(editor.Pages.getAll().map((page) => page.id));
      // }}
      onAll={(value) => {
        navigateToAnotherPage(value);
      }}
    />
  );
};
