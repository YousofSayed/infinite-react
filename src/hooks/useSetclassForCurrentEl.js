import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  getCSSPropertiesFromClass,
  replaceCSSProperties,
} from "../helpers/functions";
import {
  currentElState,
  ifrDocument,
  undoAndRedoStates,
} from "../helpers/atoms";
import { cloneObject, random } from "../helpers/cocktail";

/**
 *
 * @param {{ifrDocument:Document , currentEl:HTMLElement , cssProp:string , value:string}} param0
 */
export function useSetClassForCurrentEl() {
  const iframeDocumentVal = useRecoilValue(ifrDocument);
  const currentElObj = useRecoilValue(currentElState);
  const setUndeoAndRedo = useSetRecoilState(undoAndRedoStates);
  const setUndoAndRedoStates = useSetRecoilState(undoAndRedoStates);
  const undoAndRedoStatesVal = useRecoilValue(undoAndRedoStates);

  const cssClassesStyle =
    iframeDocumentVal.head.querySelector("#elements-classes");

  return ({ cssProp, value }) => {
    const oldCssProps = getCSSPropertiesFromClass(
      currentElObj.currentEl.id,
      cssClassesStyle.innerHTML
    );
    let newCssProps = {...oldCssProps};

    if(Array.isArray(cssProp) && Array.isArray(value)){
      console.log('is');
      
      cssProp.forEach((prop , i)=>{
        newCssProps = {...newCssProps , [prop]: value[i]}
      });
    }
    else if(Array.isArray(cssProp) && !Array.isArray(value)){
      
      cssProp.forEach((prop , i)=>{
        console.log(prop);
        
        newCssProps = {...newCssProps , [prop]: value}
      });
      console.log('not' , cssProp , oldCssProps,newCssProps);
    }
    else{
      console.log('single');
      
      newCssProps = {...newCssProps , [cssProp]: value}
    }
    // const newCssProps = { ...oldCssProps, [cssProp]: value };

    const newContent = replaceCSSProperties(
      currentElObj.currentEl.id,
      cssClassesStyle.textContent,
      newCssProps
    );
    const newPropsString = Object.keys(newCssProps)
      .map((key) => `${key}:${newCssProps[key]};`)
      .toString();
    const finalClass = `.${currentElObj.currentEl.id} {${newPropsString}}`;


    if (newContent.includes(currentElObj.currentEl.id)) {
      cssClassesStyle.textContent = newContent;
    } else {
      cssClassesStyle.textContent += finalClass;
    }

    // cssClassesStyle.innerHTML = newContent ? newContent : finalClass;
    !currentElObj.currentEl.classList.contains(currentElObj.currentEl.id) && currentElObj.currentEl.classList.add(currentElObj.currentEl.id);

    setUndoAndRedoStates((old) => ({ isStyle: true, isDropping: false }));
  };
}
