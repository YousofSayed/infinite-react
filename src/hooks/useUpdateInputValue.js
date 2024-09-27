import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentElState } from "../helpers/atoms";
import { getOriginalCSSValue, getPropVal } from "../helpers/functions";
import { useEditor, useEditorMaybe } from "@grapesjs/react";

/**
 * 
 * @param {{jsutProp:boolean , allowText:boolean , cssProp:string ,setVal:Function }}} param0 
 */
export const useUpdateInputValue = ({jsutProp=false , allowText , cssProp,setVal = (_)=>{}}) => {
  const currentElObj = useRecoilValue(currentElState);
  const editor = useEditorMaybe();

  useEffect(() => {
    if (currentElObj.currentEl ) {
     cssProp ? setVal(editor.getStyle().models[editor.getStyle().models.length-1].changed[cssProp]) : setVal('');
      // const styleElement = ifrDocVal.head.querySelector("#elements-classes");
      // const prop =
      //   getOriginalCSSValue(currentElObj.currentEl, styleElement, cssProp) ;
      //   console.log(prop , getPropVal(currentElObj.currentEl, cssProp));
      //   const finalVal = !jsutProp ? prop || getPropVal(currentElObj.currentEl, cssProp) : prop;
      //   setVal(finalVal.includes('rgb')? rgbStringToHex(finalVal) : finalVal)
    }
  }, [currentElObj]);
};
