import { Canvas, useEditorMaybe } from "@grapesjs/react";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  cmdsBuildState,
  previewContentState,
  showAnimationsBuilderState,
  showLayersState,
  showPreviewState,
} from "../../helpers/atoms";
import { P } from "../Protos/P";
import { Button } from "../Protos/Button";
import { Icons } from "../Icons/Icons";
import {
  addClickClass,
  appendWithDelay,
  html,
  parse,
  parseToHTML,
} from "../../helpers/cocktail";
import { iframeType } from "../../helpers/jsDocs";
import { buildScriptFromCmds } from "../../helpers/functions";
import { minify_sync } from "terser";
export const Iframe = () => {
  const showLayers = useRecoilValue(showLayersState);
  const showAnimBuilder = useRecoilValue(showAnimationsBuilderState);
  const setShowAnimBuilder = useSetRecoilState(showAnimationsBuilderState);
  const showPreview = useRecoilValue(showPreviewState);
  const previewContent = useRecoilValue(previewContentState);
  const [previewSrcDoc, setPreviewSrcDoc] = useState("");
  const [head, setHead] = useState([""]);
  const [body, setBody] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const previewIframe = useRef(iframeType);
  const cmds = useRecoilValue(cmdsBuildState);
  const editor = useEditorMaybe();

  useEffect(() => {
    if (!editor) return;
    editor.Canvas.refresh();
  }, [showAnimBuilder, showLayers]);

  // useEffect(() => {
  //   // setData({ data: previewContent });
  //   if (!editor || !previewIframe) return;

  //   const children = [
  //     ...new DOMParser().parseFromString(previewContent.html, "text/html").body
  //       .children,
  //   ];
  //   const prevBody = previewIframe.current.contentDocument.body;
  //   prevBody && (prevBody.innerHTML = "");

  //   appendWithDelay({
  //     where: prevBody,
  //     els: children,
  //     delay: 20,
  //     starterIndex: 0,
  //   });

  //   // setBody(editor.getHtml())
  // });

  // useEffect(() => {
  //   if (!editor) return;
  //   const getHeadCallback = () => {
  //     getHead({
  //       data: {
  //         scripts: editor.Canvas.config.scripts,
  //         styles: editor.Canvas.config.styles,
  //         css: editor.getCss(),
  //       },
  //     });
  //   };
  //   console.log("run");

  //   editor.on("canvas:frame:load:head", getHeadCallback);

  //   return () => {
  //     editor.off("canvas:frame:load:head", getHeadCallback);
  //   };
  // });

  const getHead = ({ data }) => {
    /**
     * @type {import('../helpers/types').PreviewData}
     */
    const msg = data;
    const scripts = [];
    const links = [];

    msg.scripts.forEach((scriptData) => {
      const script = document.createElement("script");
      script.src = scriptData.src;

      Object.keys(scriptData).forEach((key) => {
        script[key] = scriptData[key];
      });

      scripts.push(script);
    });

    msg.styles.forEach((styleData) => {
      const style = document.createElement("link");
      style.href = styleData.href;
      style.rel = "stylesheet";

      Object.keys(styleData).forEach((key) => {
        style[key] = styleData[key];
      });
      links.push(style);
    });

    const finalContent = [...scripts, ...links].map((item) => item.outerHTML);

    finalContent.push(
      html` <style id="global-rules">
        ${editor.getCss()}
      </style>`
    );

    return finalContent.join("");
  };

  const getAndSetPreviewData = ()=>{
    const content = html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          ${getHead({
            data: {
              scripts: editor.Canvas.config.scripts,
              styles: editor.Canvas.config.styles,
            },
          })}
          <title>Preview:</title>
        </head>

        ${editor.getHtml()}
      </html>
    `;
    previewIframe.current.contentDocument.open();
    previewIframe.current.contentDocument.write(content);
    previewIframe.current.contentDocument.close();

  }

  const reloadPreview = () => {
    // previewIframe.current.contentDocument.location.reload();
    getAndSetPreviewData()
  };

  useEffect(() => {
    if (!editor) return;
    // previewIframe.current.contentDocument.location.reload();
    const content = html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          ${getHead({
            data: {
              scripts: editor.Canvas.config.scripts,
              styles: editor.Canvas.config.styles,
            },
          })}
          <title>Preview:</title>
        </head>

        ${editor.getHtml()}
      </html>
    `;
    previewIframe.current.contentDocument.open();
    previewIframe.current.contentDocument.write(content);
    previewIframe.current.contentDocument.close();

    // setSrcDoc(content);
    // previewIframe.current.contentDocument.location.reload();
  }, [showPreview]);

  return (
    <section className="relative bg-[#aaa]    h-full">
      {showAnimBuilder && (
        <section className="flex flex-col items-center justify-center p-2 absolute top-0 left-0 z-20 bg-blur-dark w-full h-full">
          <section className="flex flex-col items-center justify-center p-3 bg-gray-900 rounded-lg gap-5">
            <figure className="relative  w-fit ">
              {Icons.animation(undefined, undefined, "#2563eb", 60, 60)}
            </figure>
            <h1 className="font-bold text-center text-white text-2xl ">
              <span className="text-blue-600 font-bold text-2xl ">" </span>
              You Are In Animations Builder Mode
              <span className="text-blue-600 font-bold text-2xl"> "</span>
            </h1>
            <Button
              onClick={(ev) => {
                setShowAnimBuilder(false);
              }}
            >
              Close
            </Button>
          </section>
        </section>
      )}

      <Canvas
        title="Editor"
        aria-label="Editor"
        style={{ display: showPreview ? "none" : "block" }}
      ></Canvas>

      {/* {showPreview && (
        <iframe
          ref={previewIframe}
          id="preview"
          style={{ display: showPreview ? "block" : "none" }}
          className={`bg-white w-full h-full ${
            showPreview && "border-[5px] border-blue-600 "
          } transition-all`}
          srcDoc={html`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                ${getHead({
                  data: {
                    scripts: editor.Canvas.config.scripts,
                    styles: editor.Canvas.config.styles,
                  },
                })}
                <title>Preview:</title>
              </head>
              ${editor.getHtml()}
            </html>
          `}
        ></iframe>
      )} */}

      <section
        className="w-full h-full rounded-xl overflow-hidden p-1"
        style={{ display: showPreview ? "block" : "none" }}
      >
        <header className="w-full h-[60px] flex items-center justify-between p-2 rounded-tl-lg rounded-tr-lg  bg-black">
          <ul className="flex items-center gap-3">
            <li className="w-[15px] h-[15px] bg-red-600 rounded-full"></li>
            <li className="w-[15px] h-[15px] bg-green-600 rounded-full"></li>
            <li className="w-[15px] h-[15px] bg-yellow-600 rounded-full"></li>
          </ul>

          <h1 className="text-slate-200 text-md p-2 bg-gray-800 rounded-lg font-semibold">
            {(editor && editor.Pages.getSelected().getName()) ||
              "No Named Page..."}
          </h1>

          <button
            onClick={(ev) => {
              addClickClass( ev.currentTarget , "click");
              reloadPreview();
            }}
          >
            {Icons.refresh({ width: 20, height: 20 })}
          </button>
        </header>
        <main className="h-full">
          <iframe
            ref={previewIframe}
            id="preview"
            className={`bg-white w-full h-full  transition-all`}
            // srcDoc={srcDoc}
          ></iframe>
        </main>
      </section>
    </section>
  );
};
