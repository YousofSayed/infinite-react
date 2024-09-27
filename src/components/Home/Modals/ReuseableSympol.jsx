import { useEditorMaybe } from "@grapesjs/react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../Protos/Input";
import { refType } from "../../../helpers/jsDocs";
import { Button } from "../../Protos/Button";
import html2canvas from "html2canvas";
import { Select } from "../Protos/Select";
import { uniqueID } from "../../../helpers/cocktail";
import { useRecoilValue } from "recoil";
import { widths } from "../../../helpers/atoms";
import { createModal } from "../../../helpers/functions";
import { ErrorModal } from "./ErrorModal";
import { P } from "../../Protos/P";

/**
 *
 * @param {{editor:import('grapesjs').Editor}} param0
 * @returns
 */
export const ReuseableSympol = ({ editor }) => {
  //   const editor = useEditorMaybe();
  const contentRef = useRef(refType);
  const [props, setProps] = useState({ name: "", category: "" });
  const [keywordsCtg, setKeywordsCtg] = useState(
    editor.Blocks.categories.models.map((ctg) => ctg.id)
  );

  const onInput = (value, prop) => {
    setProps({ ...props, [prop]: value });
  };

  const onSave = (ev) => {
    const selectedEl = editor.getSelected();
    const info = editor.DomComponents.getSymbolInfo(selectedEl).isSymbol;
    const mainSympol = editor.DomComponents.addSymbol(selectedEl);

    if (info) {
      editor.Modal.close();
      return;
    }

    selectedEl.replaceWith(mainSympol);

    editor.BlockManager.add(uniqueID(), {
      id: uniqueID(),
      label: props.name,
      category: props.category || "symbols",
      media: contentRef.current.outerHTML,
      content: function createInstance() {
        const instance = editor.DomComponents.addSymbol(mainSympol);
        /**
         * @type {import('grapesjs').Component}
         */
        const mySymbol = editor.mySymbol;
       
        if (mySymbol && editor.DomComponents.getSymbolInfo(mySymbol).isSymbol) {
          editor.Modal.close();
          createModal({
            editor:editor,
            titleJsx: <P>Error: can not create the symbol</P>,
            contentJsx: <ErrorModal editor={editor} />,
          });
          return null;
        } else {
          return instance;
        }
        // // instance.
        // return instance;

        // console.log(myVal);
      },
    });
    // editor.runCommand('symbol:add',{label:props.name, icon:contentRef.current.outerHTML , })
    editor.Modal.close();
    // console.log(editor.Components.getSymbols()[0].toHTML());
  };

  const getSelectedElAsImg = async () => {
    const selectedEl = editor.getSelected().getEl();
    const canvas = await html2canvas(selectedEl);
    contentRef.current.src = canvas.toDataURL();
  };

  useEffect(() => {
    if (!contentRef.current) return;
    getSelectedElAsImg();
  }, []);

  return (
    <section className="w-full p-2 flex flex-col gap-4 h-[500px] overflow-auto bg-gray-800 rounded-lg ">
      <header className="p-2 rounded-lg flex gap-4 justify-between bg-gray-900">
        <Input
          autoFocus={true}
          placeholder="Name"
          onInput={(ev) => {
            onInput(ev.target.value, "name");
          }}
          className="bg-gray-800 w-[40%]"
        />
        <Select
          keywords={keywordsCtg}
          placeholder="Category"
          onInput={(value) => {
            onInput(value, "category");
          }}
          value={props.category}
          className="bg-gray-800 w-[40%]"
          onItemClicked={(value) => onInput(value, "category")}
        />
        <Button onClick={onSave}>Save</Button>
      </header>
      <main className="bg-gray-900 grid place-items-center rounded-lg p-2 h-[100%]">
        <img
          ref={contentRef}
          className="w-full border-2 border-slate-400"
        ></img>
      </main>
      <footer></footer>
    </section>
  );
};
