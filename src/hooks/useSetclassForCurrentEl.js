import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  getCSSPropertiesFromClass,
  replaceCSSProperties,
} from "../helpers/functions";
import {
  currentElState,
  ifrDocument,
  refsStt,
  undoAndRedoStates,
} from "../helpers/atoms";
import { cloneObject, random, uniqueID } from "../helpers/cocktail";
import { updateSelectedWrapper } from "../helpers/customEvents";
import { gjsEditor } from "../helpers/globals";
import { useEditor, useEditorMaybe } from "@grapesjs/react";
import { useEffect, useRef } from "react";

/**
 *
 * @param {{ifrDocument:Document , currentEl:HTMLElement , cssProp:string , value:string}} param0
 */
export function useSetClassForCurrentEl() {
  const editor = useEditorMaybe();
  // const 
  /**
   * @type {{current:HTMLElement}}
   */
  const selectedEl = useRef();
 
  useEffect(()=>{
    if(!editor)return;
   selectedEl.current = editor.getSelected()
  },[editor])

  return ({ cssProp, value }) => {

    const state = editor.Selectors.getState();
    let newCssProps = {};

    if (Array.isArray(cssProp) && Array.isArray(value)) {
      cssProp.forEach((prop, i) => {
        if (!CSS.supports(prop, value[i]) && value[i]) return;
        newCssProps = { ...newCssProps, [prop]: value[i] };
      });
    } else if (Array.isArray(cssProp) && !Array.isArray(value)) {
      cssProp.forEach((prop, i) => {
        if (!CSS.supports(prop, value) && value) return;
        newCssProps = { ...newCssProps, [prop]: value };
      });
    } else {
      newCssProps =
        CSS.supports(cssProp, value) || !value
          ? { ...newCssProps, [cssProp]: value }
          : { ...newCssProps };
    }


    console.log(state);

    if (state.includes("before") || state.includes("after")) {
      newCssProps["content"] = "";
    }
    console.log(newCssProps);
    selectedEl.current.addStyle(newCssProps);
    console.log(editor.getCss());
    
  };
}
