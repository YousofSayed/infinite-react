import React from "react";

/**
 *
 * @param {{type : string , autoFocus:boolean, className:string , placeholder:string , onInput:(ev:InputEvent)=>void , onChange::(ev:InputEvent)=>void}} param0
 * @returns
 */
export const Input = ({
  type = "text",
  autoFocus = false,
  className = "",
  placeholder = "",
  onInput = (_) => {},
  onChange = (_) => {},
}) => {
  return (
    <input
      autoFocus={autoFocus}
      type={type}
      placeholder={placeholder}
      className={`p-2 outline-none text-white  rounded-lg ${className}`}
      onInput={onInput}
      onChange={onChange}
    />
  );
};
