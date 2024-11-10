import React, { useEffect, useRef, useState } from "react";
import { Input } from "../Protos/Input";
import { Select } from "../Protos/Select";
import { Button } from "../../Protos/Button";
import { useEditorMaybe } from "@grapesjs/react";
import html2canvas from "html2canvas";
import { getCategoriesId } from "../../../helpers/functions";
import { html, uniqueID } from "../../../helpers/cocktail";

export const ReusableCmb = () => {
  const editor = useEditorMaybe();
  const selectedEl = editor.getSelected();
  const [imgSrc, setImgSrc] = useState("");
  const [ctgs, setCtgs] = useState(getCategoriesId(editor));
  const [newProps, setNewProps] = useState({
    name: "",
    ctg: "",
  });

  useEffect(() => {
    //   setCtgs([...getCategoriesId(editor)]);
    getImage();
  }, []);

  const getImage = async () => {
    const canvas = await html2canvas(selectedEl.getEl());
    setImgSrc(canvas.toDataURL());
  };

  const save = () => {
    editor.Blocks.add(uniqueID(), {
      label: newProps.name,
      category: newProps.ctg,
      media: html`<img src="${imgSrc}" />`,
      id:uniqueID(),
      content: selectedEl.getEl().outerHTML,
    });

    editor.runCommand("close:current:modal");
  };

  return (
    <main className="flex flex-col gap-3 h-[400px]">
      <header className="flex gap-2 justify-between">
        <Input
          className="bg-gray-800"
          placeholder="Name"
          value={newProps.name}
          onInput={(ev) => {
            setNewProps({ ...newProps, name: ev.target.value });
          }}
        />
        <Select
          keywords={ctgs}
          placeholder="Category"
          setVal={(value) => {setNewProps({ ...newProps, ctg: value });}}
          onInput={(value) => {setNewProps({ ...newProps, ctg: value });}}
          onEnterPress={(value) => {setNewProps({ ...newProps, ctg: value });}}
          val={newProps.ctg}
        />
        <Button
          onClick={(ev) => {
            save();
          }}
        >
          Save
        </Button>
      </header>

      <section className="h-full rounded-lg p-2 bg-gray-800 flex items-center justify-center">
        <img src={imgSrc} className="w-full border-2 border-slate-400" />
      </section>
    </main>
  );
};
