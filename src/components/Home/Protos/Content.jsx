import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { getPropVal } from "../../../helpers/functions";

export const Content = () => {
  const currentEl = useRecoilValue(currentElState);
  const [showTextArea, setShowTextArea] = useState(false);
  const [warnning, setWarnning] = useState("");
  const [val , setVal] = useState();

  useEffect(() => {
    if (currentEl) {
      setShowTextArea(true);
      setWarnning(false);
      setVal(currentEl.childNodes[0].textContent)
      console.log(parseInt(`16px`));
      //   if (currentEl.children.length >= 4) {
      //     setShowTextArea(false);
      //     setWarnning(` ⚠ You can’t type any thing because the element has children , you
      //       should type in element which includes text only{" "}`);
      //   }else{

      //   }
    } else {
      setShowTextArea(false);
      setWarnning(`Choose an element`);
    }
  }, [currentEl]);

  /**
   *
   * @param {InputEvent} ev
   */
  const onInput = (ev) => {
    currentEl.childNodes[0].textContent = ev.target.value;
    setVal(ev.target.value)
  };

  return (
    <section className="w--full mt-3  flex flex-col gap-2 p-2 rounded-lg bg-gray-900">
      {warnning.length && (
        <p className="font-semibold text-[18px] text-yellow-300 ">{warnning}</p>
      )}
      {showTextArea && (
        <textarea
        value={val}
          onInput={onInput}
          className="h-[300px] max-h-[300px] w-full bg-gray-900 rounded-lg p-2 outline-none text-white"
        ></textarea>
      )}
    </section>
  );
};
