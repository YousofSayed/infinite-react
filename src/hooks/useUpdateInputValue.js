import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentElState, isRuleState, selectorState } from "../helpers/atoms";
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

  const currentElObj = useRecoilValue(currentElState);
  const editor = useEditorMaybe();
  const rule = useRecoilValue(isRuleState);
  const selector = useRecoilValue(selectorState);

  useEffect(() => {
    if (currentElObj.currentEl) {
      const slEL = editor.getSelected();
      const slElStyles = slEL.getStyle();
      const getRuleStyle = (ruleString) => {
        const currentSelector = selector
          ? selector
          : `#${currentElObj.currentEl.id}`;
        const outPut = editor.Css.getRule(
          `${currentSelector}${rule.ruleString}`
        )?.toJSON()?.style;

        console.log(outPut);

        return outPut || {};
      };

      // (cssProp && slEL.getStyle()[cssProp]) ||
      // (cssProp && rule.is && getRuleStyle()[cssProp]) ||
      // (cssProp && selector)
      //   ? setVal(
      //       rule.is && getRuleStyle()[cssProp]
      //         ? getRuleStyle()[cssProp]
      //         : selector && getRuleStyle()[cssProp]
      //         ? getRuleStyle()[cssProp]
      //         : slElStyles[cssProp]
      //     )
      //   : setVal("");

      console.log(selector);
      

      if ((cssProp && selector) || (cssProp && rule.is))
        setVal(getRuleStyle()[cssProp] || '');
      else if (slElStyles[cssProp]) setVal(slElStyles[cssProp] || '');
      else  setVal("");
      //  cssProp ? setVal(editor.getStyle().models[editor.getStyle().models.length-1].changed[cssProp]) : setVal('');
      // const styleElement = ifrDocVal.head.querystate("#elements-classes");
      // const prop =
      //   getOriginalCSSValue(currentElObj.currentEl, styleElement, cssProp) ;
      //   console.log(prop , getPropVal(currentElObj.currentEl, cssProp));
      //   const finalVal = !jsutProp ? prop || getPropVal(currentElObj.currentEl, cssProp) : prop;
      //   setVal(finalVal.includes('rgb')? rgbStringToHex(finalVal) : finalVal)
    }
  }, [currentElObj, rule, selector]);
};
