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
export const ReusableSympol = () => {
  const editor = useEditorMaybe();
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
    const info = editor.Components.getSymbolInfo(selectedEl);
    const mainOrInstance = editor.Components.addSymbol(selectedEl);
    // const mainSympol = editor.DomComponents.addSymbol(firsMain);

    // if (info) {
    //   editor.runCommand("close:current:modal");
    //   return;
    // }

    // (selectedEl).replaceWith(mainOrInstance);
    
    function createInstance() {
      console.log("instance");
      const instance = editor.DomComponents.addSymbol(selectedEl);
      // const instance = editor.DomComponents.addSymbol(mainOrInstance.clone({symbol:true}));
      // // instance.id = uniqueID();
      // instance.cid = uniqueID()
      return instance;
      // return mainOrInstance.clone({symbol:true , symbolInv:true});

      // return editor.Components.getSymbolInfo(mainOrInstance).relatives[editor.Components.getSymbolInfo(mainOrInstance).relatives.length-1]
      // /**
      //  * @type {import('grapesjs').Component}
      //  */
      // const mySymbol = editor.mySymbol;

      // if (mySymbol && editor.DomComponents.getSymbolInfo(mySymbol).isSymbol) {
      //   editor.runCommand("close:current:modal");
      //   editor.runCommand("open:error:modal", {
      //     title: <P>Error: can not create the symbol</P>,
      //     content: (
      //       <>
      //         <P>One of the parent is in the symbol.</P>
      //         <P>Please remove the parent from the symbol and try again.</P>
      //       </>
      //     ),
      //   });
      //   console.log('done if');

      //   return null;
      // } else {
      //   console.log('done else');

      //   editor.runCommand("close:current:modal");
      //   return instance;
      // }
    }

    editor.Blocks.add(uniqueID(), {
      id: uniqueID(),
      label: props.name,
      category: props.category || "symbols",
      media: contentRef.current.outerHTML,
      content:()=>{
       return createInstance()
      },
    });
    editor.runCommand("close:current:modal");
  };

  const getSelectedElAsImg = async () => {
    const selectedEl = editor.getSelected().getEl();
    const canvas = await html2canvas(selectedEl , {height:150 , allowTaint:true , });
    contentRef.current.src = canvas.toDataURL();
  };

  useEffect(() => {
    if (!contentRef.current) return;
    getSelectedElAsImg();
  }, []);

  return (
    <section className="w-full z-50 p-2 flex flex-col gap-4 h-[500px] overflow-auto bg-gray-800 rounded-lg ">
      <header className="p-2 z-50 rounded-lg flex gap-4 justify-between bg-gray-900">
        <Input
          value={props.name}
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
          onEnterPress={(value) => onInput(value, "category")}
          value={props.category}
          className="bg-gray-800 w-[40%]"
          onItemClicked={(value) => onInput(value, "category")}
        />
        <Button onClick={onSave}>Save</Button>
      </header>
      <main className="bg-gray-900 overflow-auto grid place-items-center rounded-lg p-2 h-[100%]">
        <img
          ref={contentRef}
          className="w-full border-2 border-slate-400"
        ></img>
      </main>
      <footer></footer>
    </section>
  );
};
