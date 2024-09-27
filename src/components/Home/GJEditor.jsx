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
import { blocksStt, currentElState, widths } from "../../helpers/atoms";
import { blocks } from "../../Blocks/blocks.jsx";
import { createRoot } from "react-dom/client";
import { AssetsManager } from "./AssetsManager.jsx";
import userBlocks from "grapesjs-user-blocks";
import { editorType, refType } from "../../helpers/jsDocs.js";
import {
  addItemInToolBarForEditor,
  createModal,
  handleCustomBlock,
} from "../../helpers/functions.js";
import tui from "grapesjs-tui-image-editor";
import { editorIcons } from "../Icons/editorIcons.js";
import { ReuseableSympol } from "./Modals/ReuseableSympol.jsx";
import gjsSymbolsPlugin from "@silexlabs/grapesjs-symbols";

export const GJEditor = ({ children }) => {
  const setBlocksAtom = useSetRecoilState(blocksStt);
  const setSelectedEl = useSetRecoilState(currentElState);
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
        canvas: {
          scripts: [{ src: "/scripts/alpine.js" }],
        },
        jsInHtml: true,
        // plugins: [],
        pluginsOpts: {
          // [tui]: {
          //   config: {
          //     includeUI: {
          //       initMenu: "filter",
          //     },
          //   },
          // },
          // [gjsSymbolsPlugin]: {
          //   appendTo: "#symbols",
          // },
        },
      }}
      onEditor={(ev) => {
        setEditor(ev);
        ev.addStyle(`body [data-gjs-type="wrapper"] [id]::before{content:''}`);
        ev.Blocks.categories.add({ id: "others", label: "Others" });
        setBlocksAtom({
          ...handleCustomBlock(ev.Blocks.getAll().models, ev),
          symbols: [],
        });

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
          ev.Commands.has();
          setSelectedEl({ currentEl: selectedEl.getEl() });

          addItemInToolBarForEditor({
            commandCallback: (ed) => {
              createModal({
                editor: ev,
                titleJsx: (
                  <h1 class="text-slate-300 font-bold">
                    Create Sympol (Reusable Component)
                  </h1>
                ),
                contentJsx: <ReuseableSympol editor={ev} />,
              });
            },
            label: editorIcons.reuseable,
            commandName: "open:create:symbol:model",
            editor: ev,
          });
        });

        ev.on("redo", (args) => {
          setSelectedEl({ currentEl: ev?.getSelected()?.getEl() });
        });

        ev.on("undo", (args) => {
          setSelectedEl({ currentEl: ev?.getSelected()?.getEl() });
        });

        ev.on("component:drag:start", (ev) => {
          console.log(ev, "comp");
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

        // ev.on('component:add', (droppedComponent) => {
        //   const parentComponent = droppedComponent.parent();  // Get the parent component

        //   console.log('Dropped component:', droppedComponent); // The dropped component
        //   console.log('Dropped into parent:', parentComponent); // The parent component where it was dropped

        //   return;
        // });

        const assetManager = ev.AssetManager;
        ev.on("asset:open", (args) => {
          assetManager.root = assetManager.root
            ? assetManager.root
            : createRoot(assetManager.getContainer());
          assetManager.root.render(<AssetsManager editor={ev} />);
        });
      }}
    >
      {children}
    </Editor>
  );
};
