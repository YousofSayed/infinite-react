import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  currentElState,
  framesStylesState,
  ruleState,
  selectorState,
  showAnimationsBuilderState,
} from "../helpers/atoms";
import { useEditorMaybe } from "@grapesjs/react";
import { getCurrentMediaDevice } from "../helpers/functions";

/**
 *
 * @param {{ cssProp:string ,setVal:Function ,returnPropsAsIt:boolean, onEffect :(cssProp:string , Value : Function)=>{} }}} param0
 */
export const useUpdateInputValue = ({
  cssProp,
  setVal = (_) => {},
  returnPropsAsIt = false,
  onEffect = (cssProp, setVal) => {},
}) => {
  const currentElObj = useRecoilValue(currentElState);
  const editor = useEditorMaybe();
  const rule = useRecoilValue(ruleState);
  const selector = useRecoilValue(selectorState);
  const showAnimationsBuilder = useRecoilValue(showAnimationsBuilderState);
  const framesStyles = useRecoilValue(framesStylesState);

  useEffect(() => {
    if (currentElObj.currentEl && !showAnimationsBuilder) {
      const slEL = editor.getSelected();
      const slElStyles = slEL.getStyle();
      const Media = getCurrentMediaDevice(editor);
      const getRuleStyle = () => {
        const currentSelector = selector
          ? selector
          : `#${currentElObj.currentEl.id}`;
        const outPut = editor.Css.getRule(
          `${currentSelector}${rule.ruleString}`,
          {...Media}
        )?.toJSON()?.style;
        return outPut || {};
      };

      if (selector || rule.is) {
        const value = returnPropsAsIt
          ? getRuleStyle()
          : getRuleStyle()[cssProp] || "";
        setVal(value);
        onEffect(cssProp, value);
      } else if (Object.keys(slElStyles).length) {
        const value = returnPropsAsIt ? slElStyles : slElStyles[cssProp] || "";

        setVal(value);
        onEffect(cssProp, value);
      } else {
        setVal("");
        onEffect(cssProp, "");
      }
    }

    if (showAnimationsBuilder) {
      const value = returnPropsAsIt
        ? framesStyles
        : framesStyles[cssProp] || "";
      setVal(value);
      onEffect(cssProp, value);
    }
  }, [currentElObj, rule, selector, showAnimationsBuilder, framesStyles]);
};
