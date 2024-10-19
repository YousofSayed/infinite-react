import React, { useState } from "react";
import { Select } from "./Select";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";
import { useUpdateInputValue } from "../../../hooks/useUpdateInputValue";

/**
 *
 * @param {{cssProp:string , wrap :boolean, splitHyphen : boolean , placeholder:string , label:string , keywords:string[] , setKeyword:(keyword : string)=>void}} param0
 * @returns
 */
export const SelectStyle = ({
  cssProp,
  wrap = false,
  splitHyphen = false,
  label,
  keywords,
  placeholder='',
  setKeyword=(_)=>{}
}) => {
  const setClass = useSetClassForCurrentEl();
  const [val , setVal] = useState('');

  useUpdateInputValue({setVal , cssProp});

  const onInput = (value) => {
    setVal(value);
    // setKeyword(ev.target.value);
    // filterKeywords(ev);
  };

  const onItemClicked = (item) => {
    setClass({
      cssProp,
      value: item,
    });
  };

  const onEnterPress = (keyword) =>{
    setClass({
      cssProp,
      value: keyword,
    });
  }

  return (
    <section>
      <Select
        label={label}
        splitHyphen={splitHyphen}
        placeholder={placeholder}
        keywords={keywords}
        wrap={wrap}
        setKeyword={setKeyword}
        // onInput={onInput}
        onItemClicked={onItemClicked}
        onEnterPress={onEnterPress}
        val={val}
        setVal={setVal}
      />
    </section>
  );
};