import React, { useEffect, useRef, useState } from "react";
import { Li } from "../../Protos/Li";
import { Icons } from "../../Icons/Icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentElState,
  ifrDocument,
  iframeWindow,
  refsStt,
  undoAndRedoState,
} from "../../../helpers/atoms";
import { MutateHandler } from "../../../helpers/undeAndRedo";

export const IframeControllers = () => {
  const iframeDocVal = useRecoilValue(ifrDocument);
  const undoAndRedoStyle = useRecoilValue(undoAndRedoState);
  const currentEl = useRecoilValue(currentElState);
  const setCurrentEl = useSetRecoilState(currentElState);
  const styleIndex = useRef(0);
  const styleElement = useRef();

  /**
   * @type {MutationRecord[]}
   */
  const typeOfUndoAndRedoData = [];
  const index = useRef(0);
  /**
   * @type {MutationObserverInit}
   */
  const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };
  const characterDataStack = useRef(Array.from(typeOfUndoAndRedoData));
  const attributesStack = useRef(Array.from(typeOfUndoAndRedoData));
  const childListStack = useRef(Array.from(typeOfUndoAndRedoData));
  const childListIndex = useRef(0);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const realAddedNodes = Array.from(mutation.addedNodes).filter(
        (addedNode) => addedNode.tagName
      );

      for (let i = 0; i < realAddedNodes.length; i++) {
        if (realAddedNodes[i].hasAttribute("hide-in-observer")) {
          return;
        }
      }
      if (mutation.type == "childList") {
        if (childListIndex.current > 0) {
          console.log("lldsdao");

          childListStack.current = childListStack.current.slice(
            0,
            childListIndex.current + 1
          );
        }
        childListStack.current.push(mutation);

        childListStack.current =
          childListStack.current.length > 100
            ? childListStack.current.slice(1)
            : childListStack.current;

        childListIndex.current = childListStack.current.length - 1;
        console.log(childListStack.current);
      } else if (mutation.type == "attributes") {
        attributesStack.current.push(mutation);
        attributesStack.current =
          attributesStack.current.length > 50
            ? attributesStack.current.slice(1)
            : attributesStack.current;
      } else if (mutation.type == "characterData") {
        characterDataStack.current.push(mutation);
        characterDataStack.current =
          characterDataStack.current.length > 50
            ? characterDataStack.current.slice(1)
            : characterDataStack.current;
      }
    });
  });

  const undo = () => {
    if (childListIndex.current <= -1) {
      console.log("less");
      return;
    }

    observer.disconnect();
    const mutation = childListStack.current[childListIndex.current];
    mutation.addedNodes.forEach((node) => node.remove());
    mutation.removedNodes.forEach((node) => {
      mutation.target.appendChild(node);
    });

    observer.observe(iframeDocVal.body, config);
    childListIndex.current--;
    if (childListIndex.current < 0) {
      childListIndex.current = -1;
    }
  };

  const redo = () => {
    childListIndex.current++;
    console.log(childListIndex.current);
    if (childListIndex.current > childListStack.current.length - 1) {
      childListIndex.current = childListStack.current.length - 1;
      console.log("bigger");

      return;
    }

    observer.disconnect();
    const mutation = childListStack.current[childListIndex.current];
    mutation.addedNodes.forEach((node) => {
      mutation.target.appendChild(node);
    });
    mutation.removedNodes.forEach((node) => {
      mutation.target.removeChild(node);
    });

    observer.observe(iframeDocVal.body, config);
  };

  useEffect(() => {
    /**
     *
     * @param {KeyboardEvent} ev
     */
    const handleCtrlZAndY = (ev) => {
      // console.log(ev.key);
      ev.stopPropagation();

      if (ev.ctrlKey && ev.key == "z") {
        undo();
      } else if (ev.ctrlKey && ev.key == "y") {
        redo();
      }
    };

    window.addEventListener("keyup", handleCtrlZAndY);
    return () => {
      window.removeEventListener("keyup", handleCtrlZAndY);
    };
  }, [iframeDocVal]);

  useEffect(() => {
    if (iframeDocVal) {
      // styleElement.current =
      //   iframeDocVal.head.querySelector(`#elements-classes`);
      observer.observe(iframeDocVal.body, config);
      observer.takeRecords();
    }
  }, [iframeDocVal]);

  useEffect(() => {}, [undoAndRedoStyle]);

  const clearIFrameBody = () => {
    const allElementsIn = Array.from(iframeDocVal.body.querySelectorAll("*"))
      .filter((el) => el.tagName != "style" || el.tagName != "script")
      .forEach((el) => el.remove());
      childListIndex.current = -1;
    childListStack.current = Array.from(typeOfUndoAndRedoData);
  };

  return (
    <ul className="flex gap-[15px] items-center border-r-2 pr-2 mr-2 border-slate-800">
      <Li onClick={clearIFrameBody}>{Icons.trash()}</Li>
      <Li onClick={undo}>{Icons.undo()}</Li>
      <Li onClick={redo}>{Icons.redo()}</Li>
    </ul>
  );
};
