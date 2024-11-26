import React from "react";
import { SmallButton } from "./SmallButton";
import { Icons } from "../../Icons/Icons";
import { TinyButton } from "./TinyButton";
import { Input } from "./Input";
import { Select } from "./Select";

/**
 *
 * @param {{className:string , addClassName:string , delClassName:string, inputClassName:string, showSelectMenu:boolean , keywords :string[] , value:string , setVal:(any)=>void , placeholder:string, showInput:boolean, onInput:(ev:MouseEvent)=>void, onAddClick: (ev : MouseEvent)=>void , onDeleteClick:(ev : MouseEvent)=>void}} param0
 * @returns
 */

export const Adder = ({
  children,
  className,
  addClassName = "",
  delClassName = "",
  inputClassName = "",
  placeholder = "",
  showInput = false,
  showSelectMenu = false,
  keywords = [],
  value = "",
  setVal = (val) => {},
  onInput = (ev) => {},
  onAddClick = (_) => {},
  onDeleteClick = (_) => {},
}) => {
  return (
    <section
      className={`flex w-full flex-col gap-2 p-2 rounded-lg ${
        className ? className : "bg-gray-900"
      } relative`}
    >
      {children ? <section>{children}</section> : null}

      <section className="flex items-center text-slate-200 font-semibold   justify-end  w-full  gap-2   bottom-[-40px] right-[0]  ">
        {showInput && (
          <input
            className={`p-2 rounded-lg w-[calc(100%-80px)] outline-none border-2 border-transparent focus:border-blue-600 ${
              inputClassName ? inputClassName : "bg-gray-900"
            }`}
            placeholder={placeholder || "Add Value"}
            onInput={(ev) => {
              onInput(ev);
            }}
          />
        )}

        {showSelectMenu && (
          <Select
            onInput={onInput}
            onEnterPress={onInput}
            onItemClicked={onInput}
            keywords={keywords}
            className={`${inputClassName} px-[unset] p-[unset]`}
            placeholder={placeholder}
            value={value}
            
          />
        )}

        <TinyButton
          title="Delete button"
          className={`flex-shrink-0 ${addClassName}`}
          onClick={(ev) => {
            onDeleteClick(ev);
          }}
        >
          {Icons.delete("white")}
        </TinyButton>

        <TinyButton
          title="Add Button"
          className={`flex-shrink-0 ${delClassName}`}
          onClick={(ev) => {
            onAddClick(ev);
          }}
        >
          {Icons.plus("white")}
        </TinyButton>
      </section>
    </section>
  );
};
