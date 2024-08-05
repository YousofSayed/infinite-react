import React, { useEffect, useState } from "react";
import { Li } from "../../Protos/Li";
import { Icons } from "../../Icons/Icons";
import { useRecoilValue } from "recoil";
// import style from "../../../styles/style.css?raw";
import { iframeBody, iframeWindow, refsStt } from "../../../helpers/atoms";
// import { appendStyle, iframeHandler } from "../../../helpers/functions";
let i = 0,
  maxStack = 5;

export const IframeControllers = () => {
  const iframeBodyVal = useRecoilValue(iframeBody);
  const iframe = useRecoilValue(refsStt).ifrRef;
  const iframeWindowVal = useRecoilValue(iframeWindow);
  const [bodyContent, setBodyContent] = useState([""]);

  useEffect(() => {
    /**
     *
     * @param {CustomEvent} ev
     */
    const handleBodyChange = (ev) => {
      setBodyContent([...bodyContent, ev.detail]);
      i = bodyContent.length;

      if (bodyContent.length >= maxStack) {
        setBodyContent(bodyContent.slice(1));
        i = bodyContent.length - 1;
      }
      console.log(i);
    };
    window.addEventListener("iframeBodyChange", handleBodyChange);
    return () => {
      window.removeEventListener("iframeBodyChange", handleBodyChange);
    };
  }, [bodyContent]);

  const clearIFrameBody = () => {
   
  };

  const undo = () => {

  };

  const redo = () => {
  
  };

  return (
    <ul className="flex gap-[15px] items-center border-r-2 pr-2 mr-2 border-slate-800">
      <Li onClick={clearIFrameBody}>{Icons.trash()}</Li>
      <Li onClick={undo}>{Icons.undo()}</Li>
      <Li onClick={redo}>{Icons.redo()}</Li>
    </ul>
  );
};
