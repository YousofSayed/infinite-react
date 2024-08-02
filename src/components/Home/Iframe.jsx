import React, { memo, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  iframeBody,
  iframeWindow,
  refsStt,
  showPopupIframState,
} from "../../helpers/atoms";
import { cleaner, iframeHandler } from "../../helpers/functions";

let firstRender = 0;

export const Iframe = () => {
  const ifrRef = useRef();
  const showPopUp = useRecoilValue(showPopupIframState);
  const setIframeRef = useSetRecoilState(refsStt);
  const setIframeBody = useSetRecoilState(iframeBody);

  useEffect(() => {
    firstRender++;
    if (ifrRef.current) {
      console.log(ifrRef.current);
      setIframeRef((oldstt) => ({ ...oldstt, ifrRef: ifrRef.current }));
      setIframeBody(ifrRef.current.contentDocument);
      iframeHandler(ifrRef.current);
      const script = ifrRef.current.contentDocument.createElement("script");
      script.src = "/scripts/main.js";
      ifrRef.current.contentDocument.body.appendChild(script);
    }

    return cleaner;
  });

  return (
    <section  className="relative flex-grow h-full">
      {showPopUp && (
        <div className="absolute w-full h-full bg-slate-400 z-10 opacity-[.5]"></div>
      )}

      <iframe
        ref={ifrRef}
        draggable={true}
        className="w-full h-full"
        title="It is iframe"
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
      ></iframe>
    </section>
  );
};
