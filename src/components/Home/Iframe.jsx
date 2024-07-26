import React, { memo, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { iframeBody, iframeWindow, refsStt, showPopupIframState } from "../../helpers/atoms";
import style from "../../styles/style.css?raw";
import {
  appendStyle,
  cleaner,
  iframeHandler,
  removeOldScriptsAndStyles,
} from "../../helpers/functions";

export const Iframe = (() => {
  const ifrRef = useRef();
  const showPopUp = useRecoilValue(showPopupIframState);
  const setIframeRef = useSetRecoilState(refsStt);
  const setIframeBody = useSetRecoilState(iframeBody);
  const setIframeWindow = useSetRecoilState(iframeWindow);

  useEffect(() => {
    if (ifrRef.current) {
      setIframeRef((oldstt) => ({ ...oldstt, ifrRef: ifrRef.current }));
      setIframeBody(ifrRef.current.contentDocument);
      // console.log(ifrRef.current.contentWindow);
      // setIframeWindow(ifrRef.current.contentWindow);
      removeOldScriptsAndStyles(ifrRef.current);
      iframeHandler(ifrRef.current);
      appendStyle(style, ifrRef.current);
    }

    return cleaner;
  },[]);


  return (
    <section draggable={true} className="relative flex-grow h-full" >
      {showPopUp && (
        <div className="absolute w-full h-full bg-slate-400 z-10 opacity-[.5]"></div>
      )}
      

      <iframe
        ref={ifrRef}
        draggable={true}
        className="w-full h-full"
        title="It is iframe"
        onDragOver={(ev)=>{ev.preventDefault()}}
      ></iframe>
    </section>
  );
});
