import React, { useCallback, useEffect, useRef, useState } from "react";
import { Li } from "../../Protos/Li";
import { Icons } from "../../Icons/Icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentElState,
  ifrDocument,
  undoAndRedoStates,
} from "../../../helpers/atoms";
import { childListObserver } from "../../../observers/childListObserver";
import { styleObserver } from "../../../observers/styleObserver";
import { parseToHTML } from "../../../helpers/cocktail";

export const IframeControllers = () => {
  const iframeDocVal = useRecoilValue(ifrDocument);
  const undoAndRedoStatesVal = useRecoilValue(undoAndRedoStates);
  const currentElObj = useRecoilValue(currentElState);
  const setCurrentEl = useSetRecoilState(currentElState);
  const setUndoAndRedoStates = useSetRecoilState(undoAndRedoStates);
  const undoAndRedoRef = useRef(undoAndRedoStatesVal);
  const styleElementRef = useRef();
  /**
   * @type {{   droppedEl:HTMLElement, droppedElParentNode:HTMLElement, droppedElId:string, droppedElParentNodeId:string }[]}
   */
  const typeOfUndoAndRedoData = [''];
  /**
   * @type {{current : MutationObserverInit}}
   */
  const config = useRef({
    // attributes: true,
    childList: true,
    // characterData: true,
    subtree: true,
  });

  const styleConfig = useRef({
    characterData: true,
    characterDataOldValue: true,
    subtree: true,
  });

  const childListStack = useRef(Array.from(typeOfUndoAndRedoData));
  const childListIndex = useRef(0);
  const characterDataStack = useRef([""]);
  const characterDataIndex = useRef(0);

  const childListObserverRef = useRef(
    childListObserver(childListStack, childListIndex)
  );

  const styleObserverRef = useRef(
    styleObserver(characterDataStack, characterDataIndex)
  );

  useEffect(() => {
    /**
     *
     * @param {CustomEvent} ev
     */
    const handleUndoAndeRedoEventCallback = (ev) => {
      childListStack.current = childListStack.current.slice(
        0,
        childListIndex.current + 1
      );
      childListStack.current.push(ev.detail.bodyInner);
      childListStack.current = Array.from(new Set(childListStack.current));

      childListStack.current =
        childListStack.current.length > 100
          ? childListStack.current.slice(1)
          : childListStack.current;

      childListIndex.current = childListStack.current.length - 1;
      console.log(childListStack.current, childListIndex.current);
    };
    window.addEventListener("undo:redo", handleUndoAndeRedoEventCallback);

    return () => {
      window.removeEventListener("undo:redo", handleUndoAndeRedoEventCallback);
    };
  });

  const undo = () => {
    
    if (undoAndRedoStatesVal.isDropping) {
      childListIndex.current--;
      if (childListIndex.current <= -1) {
        childListIndex.current = -1;
        return;
      }

      const obj = childListStack.current[childListIndex.current];
      iframeDocVal.body.innerHTML = obj;
      // iframeDocVal.body.insertAdjacentHTML('beforeend',obj)
 

    } else if (undoAndRedoStatesVal.isStyle) {
      characterDataIndex.current--;

      if (characterDataIndex.current <= 0) {
        characterDataIndex.current = 0;
      }

      styleObserverRef.current.disconnect();
      styleElementRef.current.textContent =
        characterDataStack.current[characterDataIndex.current];
        styleObserverRef.current.observe(
          styleElementRef.current,
          styleConfig.current
        );
    
        setCurrentEl({ currentEl: currentElObj.currentEl });
    }
  };

  const redo = () => {
    if (undoAndRedoStatesVal.isDropping) {
      childListIndex.current++;
      if (childListIndex.current > childListStack.current.length - 1) {
        childListIndex.current = childListStack.current.length - 1;
      }

      const obj = childListStack.current[childListIndex.current];
      iframeDocVal.body.innerHTML = obj;
      // iframeDocVal.body.insertAdjacentHTML('beforeend',obj);


    } else if (undoAndRedoStatesVal.isStyle) {
      styleObserverRef.current.disconnect();

      characterDataIndex.current++;
      if (characterDataIndex.current > characterDataStack.current.length - 1) {
        characterDataIndex.current = characterDataStack.current.length - 1;
      }
      styleElementRef.current.textContent =
        characterDataStack.current[characterDataIndex.current];
      styleObserverRef.current.observe(
        styleElementRef.current,
        styleConfig.current
      );

      setCurrentEl({ currentEl: currentElObj.currentEl });
    }
  };

  /**
   *
   * @param {KeyboardEvent} ev
   */
  const handleCtrlZAndY = (ev) => {
    if (ev.ctrlKey && ev.key == "z") {
      ev.preventDefault();
      // ev.stopPropagation();
      undo();
    } else if (ev.ctrlKey && ev.key == "y") {
      ev.preventDefault();
      // ev.stopPropagation();
      redo();
    }
  };

  const focusIn = (ev) => {
    setUndoAndRedoStates({ isStyle: false, isDropping: true });
  };

  const clearIFrameBody = () => {
    const allElementsIn = Array.from(iframeDocVal.body.querySelectorAll("*"))
      .filter((el) => el.tagName != "style" || el.tagName != "script")
      .forEach((el) => el.remove());
    childListIndex.current = -1;
    childListStack.current = Array.from(typeOfUndoAndRedoData);
  };

  useEffect(() => {
    /**
     *
     * @param {CustomEvent} ev
     */
    const onCurrentEl = (ev) => {
      characterDataStack.current = [""];
    };

    window.addEventListener("currentel", onCurrentEl);

    return () => {
      window.removeEventListener("currentel", onCurrentEl);
    };
  });

  useEffect(() => {
    if (iframeDocVal) {
      const styleElement = iframeDocVal.head.querySelector("#elements-classes");
      styleElementRef.current = styleElement;
      styleObserverRef.current.observe(styleElement, styleConfig.current);

      childListObserverRef.current.observe(iframeDocVal.body, config.current);
    }

    return () => {
      childListObserverRef.current.disconnect();
    };
  }, [iframeDocVal]);

  useEffect(() => {
    undoAndRedoRef.current = undoAndRedoStatesVal;
    window.addEventListener("iframeWindowIn", focusIn);
    window.addEventListener("keyup", handleCtrlZAndY);

    return () => {
      window.removeEventListener("iframeWindowIn", focusIn);
      window.removeEventListener("keyup", handleCtrlZAndY);
    };
  }, [undoAndRedoStatesVal]);

  return (
    <ul className="flex gap-[15px] items-center border-r-2 pr-2 mr-2 border-slate-800">
      <Li onClick={clearIFrameBody}>{Icons.trash()}</Li>
      <Li onClick={undo}>{Icons.undo()}</Li>
      <Li onClick={redo}>{Icons.redo()}</Li>
    </ul>
  );
};
