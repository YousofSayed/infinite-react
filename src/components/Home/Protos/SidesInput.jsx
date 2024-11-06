import React, { useState } from "react";
import { onFocus, onInput, onKeyDown, onKeyUp } from "../../../helpers/propertyInputHandlers";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { useUpdateInputValue } from "../../../hooks/useUpdateInputValue";

export const SidesInput = ({
  value,
  placeholder,
  cssProp,
  isCurrentELChange,
  handleVals,
  handleClass
}) => {
  const currentElObj = useRecoilValue(currentElState);
//   const [val , setVal] = useState(value);

  useUpdateInputValue({
    cssProp,
    setVal:(val)=>{handleVals(val)}
  })
  return (
    <input
      value={value}
      placeholder={placeholder}
      onInput={(ev) => {
        onInput({
          cssProp,
          ev,
          setClass: handleClass,
          setVal: (val) => {
            handleVals(val);
          },
          isCurrentELChange,
          currentElObj,
        });
      }}
      onKeyUp={(ev) => {
        onKeyUp({ ev, isCurrentELChange });
      }}
      onKeyDown={(ev) => {
        onKeyDown({
          ev,
          isCurrentELChange,
          cssProp: cssProp,
          setClass: handleClass,
          setVal: (val) => {
            handleVals(val, "tVal");
          },
        });
      }}

      type="text"
      className="p-2 text-center bg-slate-800 rounded-lg w-[35%] text-slate-200 outline-none font-semibold"
    />
  );
};