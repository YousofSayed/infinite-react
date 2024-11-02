import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  getCSSPropertiesFromClass,
  replaceCSSProperties,
} from "../helpers/functions";
import {
  currentElState,
  ifrDocument,
  ruleState,
  refsStt,
  selectorState,
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
  const rule = useRecoilValue(ruleState);
  const selector = useRecoilValue(selectorState);

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

    if (state.includes("before") || state.includes("after")) {
      newCssProps["content"] = "";
    }
    console.log(newCssProps);
    const currentSelector = selector
      ? selector
      : `#${editor.getSelected().getEl().id}`;

    editor.Css.setRule(`${currentSelector}${rule.ruleString}`, newCssProps, {
      addStyles: true,
    });

    console.log(rule.ruleString, "%$%%$#$", editor.getCss());
  };
}
