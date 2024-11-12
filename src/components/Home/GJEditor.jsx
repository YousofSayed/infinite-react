import { Editor } from "@grapesjs/react";
import React from "react";
import grapesjs from "grapesjs";
import { useSetRecoilState } from "recoil";
import { blocksStt, currentElState, ruleState } from "../../helpers/atoms";
import { blocks } from "../../Blocks/blocks.jsx";
import { handleCustomBlock } from "../../helpers/functions.js";

import { useNavigate } from "react-router-dom";
import { addDevices } from "../../plugins/addDevices.js";
import { customModal } from "../../plugins/cutomModal.js";
import { addNewTools } from "../../plugins/addNewTools.jsx";
import { addNewBuiltinCommands } from "../../plugins/addNewBuiltinCommands.jsx";

export const GJEditor = ({ children }) => {
  const setBlocksAtom = useSetRecoilState(blocksStt);
  const setSelectedEl = useSetRecoilState(currentElState);
  const setRule = useSetRecoilState(ruleState);
  const navigate = useNavigate();

  return (
    <Editor
      title="Editor"
      grapesjs={grapesjs}
      options={{
        height: "100%",
        width: "100%",
        autorender:true,
        multipleSelection:true,
        showOffsets:true,
        exportWrapper: true,
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

        plugins: [addDevices, customModal, addNewTools, addNewBuiltinCommands],
      }}
      onEditor={(ev) => {
        // ev.addStyle(`@keyframes lol {0%{opayity:0;} 100%{opacity:1;}}`)
        // ev.addStyle(`@keyframes lol2 {0%{opayity:0;} 100%{opacity:1;}}`)

        ev.Blocks.categories.add({ id: "others", title: "Others" });
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

          navigate("edite/styling");
        });

        ev.on("redo", (args) => {
          setSelectedEl({ currentEl: ev?.getSelected()?.getEl() });
        });

        ev.on("undo", (args) => {
          setSelectedEl({ currentEl: ev?.getSelected()?.getEl() });
        });

        ev.on("undo", () => {
          setSelectedEl(ev.getSelected().getEl());
        });

        ev.on("redo", () => {
          setSelectedEl(ev.getSelected().getEl());
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
