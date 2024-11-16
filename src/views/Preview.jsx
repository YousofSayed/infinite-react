import React, { useEffect, useState } from "react";
import { html } from "../helpers/cocktail";
import { useRecoilValue } from "recoil";
import { previewContentState } from "../helpers/atoms";

export const Preview = () => {
  const [srcDoc, setSrcDoc] = useState("");
  const previewContnet = useRecoilValue(previewContentState);
  const previewCahnnel = new BroadcastChannel("preview");

  useEffect(() => {
    /**
     *
     * @param {MessageEvent} msg
     * @returns
     */
    const setData = ({ data }) => {
      /**
       * @type {import('../helpers/types').BroadCastChannelResponse}
       */
      const msg = data;

      if (!Object.keys(msg.scripts).length || !Object.keys(msg.styles).length)
        return;

      const parser = new DOMParser();
      const documntParsed = parser.parseFromString(msg.html, "text/html");
      const head = documntParsed.head;

      msg.scripts.forEach((scriptData) => {
        const script = document.createElement("script");
        script.src = scriptData.src;

        Object.keys(scriptData).forEach((key) => {
          script[key] = scriptData[key];
        });

        head.appendChild(script);
      });

      msg.styles.forEach((styleData) => {
        const style = document.createElement("link");
        style.href = styleData.href;
        style.rel='stylesheet';

        Object.keys(styleData).forEach((key) => {
          style[key] = styleData[key];
        });

        head.appendChild(style);
      });

      const finalSrcDoc = html`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            ${head.innerHTML}
            <style id="global-style">
              ${msg.css}
            </style>
          </head>
          <body>
            ${documntParsed.body.innerHTML}
          </body>
        </html>
      `;

      setSrcDoc(finalSrcDoc);
    };

    previewCahnnel.addEventListener("message", setData);

    return ()=>{
        previewCahnnel.removeEventListener("message", setData);
    }
  },[]);

  return <iframe className="w-full h-full bg-white" srcDoc={srcDoc}></iframe>;
};
