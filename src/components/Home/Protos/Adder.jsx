import React from "react";
import { SmallButton } from "./SmallButton";
import { Icons } from "../../Icons/Icons";
import { TinyButton } from "./TinyButton";

/**
 *
 * @param {{className:string , onAddClick: (ev : MouseEvent)=>void , onDeleteClick:(ev : MouseEvent)=>void}} param0
 * @returns
 */

export const Adder = ({ children, className, onAddClick = (_)=>{}, onDeleteClick= (_)=>{} }) => {
  return (
    <section
      className={`flex w-full flex-col gap-2 p-2 rounded-lg ${
        className ? className : "bg-gray-900"
      } relative`}
    >
      <section>{children}</section>

      <section className="items-end justify-end  w-full flex gap-2   bottom-[-40px] right-[0]  ">

        <TinyButton
          onClick={(ev) => {
            onDeleteClick(ev);
          }}
        >
          {Icons.delete("white")}
        </TinyButton>

        <TinyButton
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
