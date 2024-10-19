import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentElState, isRuleState } from "../helpers/atoms";
import { useEditorMaybe } from "@grapesjs/react";

/**
 *
 * @param {{jsutProp:boolean , allowText:boolean , cssProp:string ,setVal:Function }}} param0
 */
export const useUpdateInputValue = ({
  justProp = false,
  allowText,
  cssProp,
  setVal = (_) => {},
}) => {
  console.log("sss", cssProp, setVal);

  const currentElObj = useRecoilValue(currentElState);
  const editor = useEditorMaybe();
  const rule = useRecoilValue(isRuleState);

  useEffect(() => {
    if (currentElObj.currentEl) {
      const slEL = editor.getSelected();
      const slElStyles = slEL.getStyle();
      const getRuleStyle = (ruleString) => {
        const outPut = editor.Css.getRule(
          `#${currentElObj.currentEl.id}${rule.ruleString}`
        )?.toJSON()?.style;

        return outPut || {};
      };

      (cssProp && slEL.getStyle()[cssProp]) ||
      (cssProp && rule.is && getRuleStyle()[cssProp])
        ? setVal(
            rule.is && getRuleStyle()[cssProp]
              ? getRuleStyle()[cssProp]
              : slElStyles[cssProp]
          )
        : setVal("");
      //  cssProp ? setVal(editor.getStyle().models[editor.getStyle().models.length-1].changed[cssProp]) : setVal('');
      // const styleElement = ifrDocVal.head.querystate("#elements-classes");
      // const prop =
      //   getOriginalCSSValue(currentElObj.currentEl, styleElement, cssProp) ;
      //   console.log(prop , getPropVal(currentElObj.currentEl, cssProp));
      //   const finalVal = !jsutProp ? prop || getPropVal(currentElObj.currentEl, cssProp) : prop;
      //   setVal(finalVal.includes('rgb')? rgbStringToHex(finalVal) : finalVal)
    }
  }, [currentElObj, rule]);
};
