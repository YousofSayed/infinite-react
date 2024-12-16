import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  ruleState,
  selectorState,
  showAnimationsBuilderState,
  animeStylesState,
} from "../helpers/atoms";

import { useEditor, useEditorMaybe } from "@grapesjs/react";
import { useRemoveCssProp } from "./useRemoveCssProp";
import { getCurrentMediaDevice } from "../helpers/functions";

/**
 *
 * @param {{ifrDocument:Document , currentEl:HTMLElement , cssProp:string , value:string}} param0
 */
export function useSetClassForCurrentEl() {
  const editor = useEditorMaybe();
  const rule = useRecoilValue(ruleState);
  const selector = useRecoilValue(selectorState);
  const removeProp = useRemoveCssProp();
  const showAnimationsBuilder = useRecoilValue(showAnimationsBuilderState);
  const setAnimeStyles = useSetRecoilState(animeStylesState);

  return ({ cssProp, value }) => {
    let newCssProps = {};
    console.log("loloe");

    if (Array.isArray(cssProp) && Array.isArray(value)) {
      cssProp.forEach((prop, i) => {
        if (showAnimationsBuilder) {
          setAnimeStyles({
            [prop]: CSS.supports(prop, value[i]) ? value[i] : "",
          });
          return;
        }

        if (!CSS.supports(prop, value[i]) && value[i]) {
          removeProp({ cssProp: prop });
          return;
        }

        newCssProps = { ...newCssProps, [prop]: value[i] };
      });
    } else if (Array.isArray(cssProp) && !Array.isArray(value)) {
      cssProp.forEach((prop, i) => {
        if (showAnimationsBuilder) {
          setAnimeStyles({
            [prop]: CSS.supports(prop, value) ? value : "",
          });

          return;
        }

        if (!CSS.supports(prop, value) && value) {
          removeProp({ cssProp: prop });
          return;
        }

        newCssProps = { ...newCssProps, [prop]: value };
      });
    } else {
      if (showAnimationsBuilder) {
        console.log("color", CSS.supports(cssProp, value));

        setAnimeStyles({
          [cssProp]: CSS.supports(cssProp, value) ? value : "",
        });

        return;
      }

      newCssProps =
        CSS.supports(cssProp, value) || value
          ? { ...newCssProps, [cssProp]: value }
          : { ...newCssProps } && removeProp({ cssProp });
    }

    if (showAnimationsBuilder) return;
    if (
      rule.ruleString.includes("before") ||
      rule.ruleString.includes("after")
    ) {
      console.log("contento : ", newCssProps);

      newCssProps.content = " '' ";
    }

    const Media = getCurrentMediaDevice(editor);
    const currentSelector = selector
      ? selector
      : `#${editor.getSelected().getEl().id}`;

    const symbolInfo = editor.Components.getSymbolInfo(editor.getSelected());
    if (!selector && symbolInfo.isSymbol) {
      const instances = symbolInfo.instances
        .filter((instance) => instance.getEl())
        .map((instance) => instance.getEl());
      instances.forEach((instance) => {
        editor.Css.setRule(`#${instance.id}${rule.ruleString}`, newCssProps, {
          addStyles: true,
          ...Media,
        });
      });
    } else {
      editor.Css.setRule(`${currentSelector}${rule.ruleString}`, newCssProps, {
        addStyles: true,
        ...Media,
      });
    }

    // editor.Css.setRule(`${currentSelector}${rule.ruleString}`, newCssProps, {
    //   addStyles: true,
    //   ...Media,
    // });

    console.log(rule.ruleString, "%$%%$#$", editor.getCss());
    console.log("Editor Css:", editor.getDevice());
    // console.log(editor.Devices.get("tablet").getWidthMedia());
  };
}
