import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentElState, ruleState, selectorState } from "../helpers/atoms";
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
  const rule = useRecoilValue(ruleState);
  const selector = useRecoilValue(selectorState);

  useEffect(() => {
    if (currentElObj.currentEl) {
      const slEL = editor.getSelected();
      const slElStyles = slEL.getStyle();
      const getRuleStyle = () => {
        const currentSelector = selector
          ? selector
          : `#${currentElObj.currentEl.id}`;
        const outPut = editor.Css.getRule(
          `${currentSelector}${rule.ruleString}`
        )?.toJSON()?.style;

        console.log(outPut);

        return outPut || {};
      };

      console.log(selector , rule.ruleString);

      if ((cssProp && selector) || (cssProp && rule.is))
        setVal(getRuleStyle()[cssProp] || "");
      else if (slElStyles[cssProp]) setVal(slElStyles[cssProp] || "");
      else setVal("");
    }
  }, [currentElObj, rule, selector]);
};
