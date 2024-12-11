import { Editor } from "@grapesjs/react";
import React, { useState } from "react";
import grapesjs from "grapesjs";
import { useSetRecoilState } from "recoil";
import {
  blocksStt,
  currentElState,
  previewContentState,
  ruleState,
} from "../../helpers/atoms";
import { blocks } from "../../Blocks/blocks.jsx";
import {
  buildScriptsFromArray,
  handleCustomBlock,
} from "../../helpers/functions.js";

import { useLocation, useNavigate, useResolvedPath } from "react-router-dom";
import { addDevices } from "../../plugins/addDevices.js";
import { customModal } from "../../plugins/cutomModal.js";
import { addNewTools } from "../../plugins/addNewTools.jsx";
import { addNewBuiltinCommands } from "../../plugins/addNewBuiltinCommands.jsx";
import { customCmps } from "../../plugins/customCmps.jsx";
import { muatationDomElements } from "../../plugins/mutation.js";
import { css, html, uniqueID } from "../../helpers/cocktail.js";
import customColors from "grapesjs-plugin-borders";
import _hyperscript from "hyperscript.org";
import { hsProcessNode } from "../../helpers/customEvents.js";

export const GJEditor = ({ children }) => {
  const setBlocksAtom = useSetRecoilState(blocksStt);
  const setSelectedEl = useSetRecoilState(currentElState);
  const setRule = useSetRecoilState(ruleState);
  const navigate = useNavigate();
  const setPreviewContent = useSetRecoilState(previewContentState);
  const [plugins, setPlugins] = useState([
    // customColors,
    customCmps,
    addDevices,
    customModal,
    addNewTools,
    addNewBuiltinCommands,
    muatationDomElements,
  ]);
  const previewCahnnel = new BroadcastChannel("preview");
  const location = useLocation();

  return (
    <Editor
      title="Editor"
      grapesjs={grapesjs}
      options={{
        height: "100%",
        width: "100%",
        autorender: true,
        multipleSelection: true,
        avoidDefaults: true,
        showOffsets: true,
        clearStyles: true,
        canvasCss: css`
          .parent {
            display: flex;
            padding: 10px;
          }
          .row {
            min-height: 75px;
            flex-grow: 1;
          }

          .col {
            min-height: 75px;
            flex-grow: 1;
          }

          .dt {
            display: inline-block;
            padding: 10px;
          }
        `,
        pageManager: {
          selected: "index",

          pages: [
            {
              id: "index",
              name: "index",
              // component: "hello index",
            },
            {
              id: "playground",
              name: "playground",
              // component: "hello playground",
            },
          ],
        },
        // exportWrapper: true,
        optsHtml: {
          // attributes: true,
          keepInlineStyle: true,
          altQuoteAttr: true,

          // withProps: true,
          // asDocument: true,
        },
        parser: {
          optionsHtml: {
            allowScripts: true,
            allowUnsafeAttr: true,
            allowUnsafeAttrValue: true,
            htmlType: "text/html",
          },
        },
        showOffsetsSelected: true,

        storageManager: false,
        panels: { defaults: [] },
        blockManager: {
          // appendTo: "#blocks",

          blocks: blocks,
          custom: true,
        },
        // customUI: true,
        // headless:true,

        // plugins:[mutationPlugin],
        canvas: {
          // allowExternalDrop: true,
          // extHl: true,
          // infiniteCanvas:true,
          scripts: [
            { src: "/scripts/hyperscript@0.9.13.js", async: true },
            { src: "/scripts/proccesNodeInHS.js", async: true, dev: true },
          ],
          // styles: [{ href: "/styles/style.css" }],
        },
        jsInHtml: true,
        plugins,
      }}
      onEditor={(ev) => {
        // ev.addStyle(`@keyframes lol {0%{opayity:0;} 100%{opacity:1;}}`)
        // ev.addStyle(`@keyframes lol2 {0%{opayity:0;} 100%{opacity:1;}}`)
        // ev.refresh({tools:true})
        // window.el = '`<button>${$kw}</button>`'
        // const cmp = ev.addComponents(html`<div>Hyperscript</div>`)[0];
        // cmp.setAttributes({
        //   _: `init append '<button>click222</button>' to me`,
        // });

        // console.log(cmp.getEl());

        // // _hyperscript.processNode(cmp.getEl());
        // ev.on("canvas:frame:load:body", () => {
        //   console.log(cmp.getEl());
        //   console.log(cmp.getEl().getAttribute("_"));
        //   hsProcessNode(cmp.getEl())
        //   // _hyperscript.processNode(cmp.getEl());
        // });

        // setTimeout(()=>{
        //   for (let i = 0; i < 2; i++) {
        //     ev.addComponents(html`
        //       <section
        //         data-gjs-highlightable="true"
        //         id="ivyu9"
        //         data-gjs-type="default"
        //         draggable="true"
        //         class="parent"
        //       >
        //         <div
        //           data-gjs-highlightable="true"
        //           id="iixz5"
        //           data-gjs-type="default"
        //           draggable="true"
        //           class="row"
        //         >
        //           <button
        //             data-gjs-highlightable="true"
        //             id="ic2gz"
        //             data-gjs-type="text"
        //             draggable="true"
        //             _="on click log 'haha' then remove me end"
        //           >
        //             Click me</button
        //           ><input
        //             data-gjs-highlightable="true"
        //             id="iy3jg"
        //             data-gjs-type="input"
        //             draggable="true"
        //             type="text"
        //             name="default-name"
        //             placeholder="Insert text here"
        //           /><input
        //             data-gjs-highlightable="true"
        //             id="iho9j"
        //             data-gjs-type="input"
        //             draggable="true"
        //             type="text"
        //             name="default-name"
        //             placeholder="Insert text here"
        //           />
        //         </div>
        //         <div
        //           data-gjs-highlightable="true"
        //           id="i1jcl"
        //           data-gjs-type="default"
        //           draggable="true"
        //           class="row"
        //         >
        //           <input
        //             data-gjs-highlightable="true"
        //             id="i3q3d"
        //             data-gjs-type="input"
        //             draggable="true"
        //             type="text"
        //             name="default-name"
        //             placeholder="Insert text here"
        //             class=""
        //           />
        //         </div>
        //       </section>
        //     `);
        //   }
        // },2000)

        // ev.on("canvas:frame:load:head", () => {
        //   console.log("body loaded");
        //   ev.Canvas.getDocument().head.insertAdjacentHTML(
        //     "beforeend",
        //     buildScriptsFromArray(ev.config.scripts)
        //   );
        //   // ev.config.scripts.forEach(())
        // });

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

        ev.on("component:deselected", () => {
          setSelectedEl({ currentEl: undefined });
        });

        ev.on("component:selected", () => {
          const selectedEl = ev.getSelected();
          console.log(selectedEl.getName());
          console.log("selected : ", ev.getCss());

          setSelectedEl({ currentEl: selectedEl.getEl() });
          setRule({ is: false, ruleString: "" });
          // selectedEl.getEl().setAttribute('_' , `on click log 'done-${uniqueID()}'`)
          // const newCmp = selectedEl.replaceWith(selectedEl.clone())[0];
          // newCmp.addAttributes({ _: `on click log 'done-${uniqueID()}'` });
          // _hyperscript.processNode(newCmp.getEl());
          // console.log(_hyperscript.parse(`on click log 'done-${uniqueID()}'`));
          // ev.select(newCmp)
          // console.log(_hyperscript.evaluate(`on click log 'eval'`));

          // console.log(
          //   ev.addComponents(
          //     {
          //       tagName: "div",
          //       components: "hhh1hh1h1h1",
          //     },
          //     { silent: true }
          //   )[0]
          // );

          // for (let i = 0; i < 2000; i++) {
          // selectedEl
          // .getEl()
          // .insertAdjacentHTML(
          //   "afterend",
          //   '<div id="loer" data-gjs-type="text" draggable="true" >123456789</div>'
          // );
          // }

          // selectedEl
          // .getEl()
          // .insertAdjacentHTML(
          //   "afterend",
          //   '<div data-gjs-editable="true" data-gjs-type="text" draggable="true" >123456789</div>'
          // );

          //   // window.open('/preview' , '_blank')
          // console.log(ev.getWrapper());
          // console.log(ev.DomComponents.getWrapper().getEl().innerHTML);

          // ev.DomComponents.getWrapper().components().reset(ev.Canvas.getBody().innerHTML)
          // console.log(ev.$('#loer'));
          // ev.DomComponents.
          console.log(location.pathname);
          console.log(window.location.pathname);

          window.location.pathname === "/" && navigate("edite/styling");
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
