import React, { useEffect, useRef, useState } from "react";
import { Details } from "./Details";
import { refType } from "../../../helpers/jsDocs";

/**
 *
 * @param {{label : string , HTMLChildren : HTMLElement[]}} param0
 * @returns
 */
export const DetailsForBlocks = ({ label, HTMLChildren }) => {
  const [isShow , setIsShow] = useState(false);
  const blocksContainerRef = useRef(refType);
  useEffect(() => {
    if (!blocksContainerRef.current) return;
    
    blocksContainerRef.current.innerHTML = '';
    HTMLChildren.forEach((HTMLChild) => {
      blocksContainerRef.current.appendChild(HTMLChild);
    });
  },[isShow]);

  return (
    <Details label={label} setIsShow={setIsShow}>
      <section id={label} ref={blocksContainerRef} className="mt-3 grid custom-grid-col"></section>
    </Details>
  );
};
