import { Editor, useEditorMaybe } from "@grapesjs/react";
import React, { useEffect, useRef, useState } from "react";
import { html, uniqueID } from "../../helpers/cocktail";
import grapesjs from "grapesjs";
import {
  RecoilRoot,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  blocksStt,
  currentElState,
  ruleState,
  widths,
} from "../../helpers/atoms";
import { blocks } from "../../Blocks/blocks.jsx";
import { createRoot } from "react-dom/client";
import { AssetsManager } from "./AssetsManager.jsx";
import { editorType, refType } from "../../helpers/jsDocs.js";
import {
  addItemInToolBarForEditor,
  createModal,
  handleCustomBlock,
} from "../../helpers/functions.js";
import { editorIcons } from "../Icons/editorIcons.js";
import { ReuseableSympol } from "./Modals/ReuseableSympol.jsx";
import { useNavigate, useNavigation } from "react-router-dom";
import { addDevices } from "../../plugins/addDevices.js";
import { customModal } from "../../plugins/cutomModal.js";

export const GJEditor = ({ children }) => {
  const setBlocksAtom = useSetRecoilState(blocksStt);
  const setSelectedEl = useSetRecoilState(currentElState);
  const setRule = useSetRecoilState(ruleState);
  const navigate = useNavigate();
  const editorBlocks = useRecoilValue(blocksStt);

  const [editor, setEditor] = useState(editorType);

  // useEffect(() => {
  //   if (!editorBlocks.length || !editor) return;
  //   const ctgs = editor.Blocks.getBlocksByCategory();
  //   const blocks = editor.Blocks.getAll().models;
  //   blocks.forEach((block) => {
  //     if (!block.category) return;
  //     const blockEl = editor.Blocks.render(block.attributes, {
  //       external: true,
  //     });
  //     const el = document.querySelector(`#blocks-ctg-${block.category.id}`);
  //     console.log(block.category.id);

  //     el.append(blockEl);
  //   });
  // }, [editorBlocks, editor]);

  return (
    <Editor
      grapesjs={grapesjs}
      options={{
        height: "100%",
        width: "100%",

        storageManager: false,
        panels: { defaults: [] },
        blockManager: {
          // appendTo: "#blocks",
          blocks: blocks,
          custom: true,
        },

        // plugins:[mutationPlugin],
        canvas: {
          scripts: [
            // { src: "/scripts/alpine.js", },
            // {src : "/scripts/hyperScriptFunctions._hs" , type:'text/hyperscript'},
            // {src : "https://unpkg.com/hyperscript.org@0.9.12"},
            // { src: "https://unpkg.com/lucia", type:'module' },
            // {
            //   src: "https://unpkg.com/petite-vue",
            //   defer: true,
            //   init: true,
            // },
            // { src: "/scripts/cock.js" },
          ],
          styles: [{ href: "/styles/style.css" }],
        },
        jsInHtml: true,

        plugins: [addDevices , customModal],
      }}
      onEditor={(ev) => {
        setEditor(ev);
        ev.addStyle(
          `body [data-gjs-type="wrapper"] [id]::before{content:''} .lol{font-size:32px}`
        );
        ev.Blocks.categories.add({ id: "others", label: "Others" });
        setBlocksAtom({
          ...handleCustomBlock(ev.Blocks.getAll().models, ev),
          symbols: [],
        });
        ev.runCommand("core:component-outline");

        ev.on(
          "block:add",
          /**
           *
           * @param {import('grapesjs').Block} block
           */
          (block) => {
            if (!block.attributes.category || !block.attributes.category.id) {
              block.attributes.category = "others";
            }

            setBlocksAtom((old) => ({
              ...handleCustomBlock(ev.Blocks.getAll().models, ev),
            }));
          }
        );

        ev.on("component:selected", () => {
          const selectedEl = ev.getSelected();
          setSelectedEl({ currentEl: selectedEl.getEl() });
          setRule({ is: false, ruleString: "" });
          console.log("select");

          addItemInToolBarForEditor({
            commandCallback: (ed) => {
              ed.runCommand('open:custom:modal',{
                title:`Create Sympol (Reusable Component)`,
                JSXModal : <ReuseableSympol editor={ev} />
              })
              // createModal({
              //   editor: ev,
              //   titleJsx: (
              //     <h1 class="text-slate-300 font-bold">
              //       Create Sympol (Reusable Component)
              //     </h1>
              //   ),
              //   contentJsx: <ReuseableSympol editor={ev} />,
              // });
            },
            label: editorIcons.reuseable,
            commandName: "open:symbol:model",
            editor: ev,
          });
          navigate("edite/styling");
        });

        ev.on("redo", (args) => {
          setSelectedEl({ currentEl: ev?.getSelected()?.getEl() });
        });

        ev.on("undo", (args) => {
          setSelectedEl({ currentEl: ev?.getSelected()?.getEl() });
        });


        ev.on("canvas:dragover", (eve) => {
          /**
           *
           * @param {import('grapesjs').Component} el
           */
          const getSymbol = (el) => {
            ev.mySymbol = el;
          };
          getSymbol(ev.DomComponents.getById(eve.target.id));
        });

      }}
    >
      {children}
    </Editor>
  );
};
