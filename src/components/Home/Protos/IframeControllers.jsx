import React, { useEffect, useState } from "react";
import { Li } from "../../Protos/Li";
import { Icons } from "../../Icons/Icons";
import { useRecoilValue } from "recoil";
import style from "../../../styles/style.css?raw";
import { iframeBody, iframeWindow, refsStt } from "../../../helpers/atoms";
import { appendStyle, iframeHandler } from "../../../helpers/functions";
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
    if (bodyContent[bodyContent.length - 1] == "") return;
    iframeBodyVal.body.innerHTML = "";
    setBodyContent([...bodyContent, ""]);
    i = bodyContent.length;
    if (bodyContent.length >= maxStack) {
      setBodyContent(bodyContent.slice(1));
    }
    iframeBodyVal.body.style.hight = iframe.contentWindow.innerHight;
    appendStyle(style, iframe);
    console.log(i);
  };

  const undo = () => {
    if (i <= 0) {
      i = 0;
      return;
    }
    i--;
    iframeBodyVal.body.innerHTML = bodyContent[i];
    if (i == 0) appendStyle(style, iframe);
    console.log("undo", bodyContent.length, i);
    appendStyle(style, iframe);
  };

  const redo = () => {
    console.log("redo");
    i >= bodyContent.length - 1 ? (i = bodyContent.length - 1) : i++;
    iframeBodyVal.body.innerHTML = bodyContent[i];
    appendStyle(style, iframe);
  };

  return (
    <ul className="flex gap-[15px] items-center border-r-2 pr-2 mr-2 border-slate-800">
      <Li onClick={clearIFrameBody}>{Icons.trash()}</Li>
      <Li onClick={undo}>{Icons.undo()}</Li>
      <Li onClick={redo}>{Icons.redo()}</Li>
    </ul>
  );
};
