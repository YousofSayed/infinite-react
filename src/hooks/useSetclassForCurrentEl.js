import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  getCSSPropertiesFromClass,
  replaceCSSProperties,
} from "../helpers/functions";
import {
  currentElState,
  ifrDocument,
  undoAndRedoState,
} from "../helpers/atoms";

/**
 *
 * @param {{ifrDocument:Document , currentEl:HTMLElement , cssProp:string , value:string}} param0
 */
export function useSetClassForCurrentEl() {
  const iframeDocumentVal = useRecoilValue(ifrDocument);
  const currentEl = useRecoilValue(currentElState);
  const setUndeoAndRedo = useSetRecoilState(undoAndRedoState);

  const cssClassesStyle =
    iframeDocumentVal.head.querySelector("#elements-classes");

  return ({ cssProp, value }) => {
    const oldCssProps = getCSSPropertiesFromClass(
      currentEl.id,
      cssClassesStyle.innerHTML
    );
    const newCssProps = { ...oldCssProps, [cssProp]: value };

    const newContent = replaceCSSProperties(
      currentEl.id,
      cssClassesStyle.innerHTML,
      newCssProps
    );
    const newPropsString = Object.keys(newCssProps)
      .map((key) => `${key}:${newCssProps[key]};`)
      .toString();
    const finalClass = `.${currentEl.id} {${newPropsString}}`;

    console.log(currentEl.id, newContent, finalClass);

    if (newContent.includes(currentEl.id)) {
      cssClassesStyle.innerHTML = newContent;
    } else {
      cssClassesStyle.innerHTML += finalClass;
    }

    // cssClassesStyle.innerHTML = newContent ? newContent : finalClass;
    currentEl.classList.add(currentEl.id);
    setUndeoAndRedo((old) => {
      return {
        isStyle: true,
        styleInner: [...old.styleInner, cssClassesStyle.innerHTML],
      };
    });
  };
}
