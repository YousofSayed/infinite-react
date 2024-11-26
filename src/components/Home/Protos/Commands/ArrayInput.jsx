import React, { useEffect, useState } from "react";
import { Input } from "../Input";
import { SmallButton } from "../SmallButton";
import { Icons } from "../../../Icons/Icons";
import { Choices } from "../Choices";

export const ArrayInput = ({
  array,
  value='',
  placeholder,
  onInput = (value) => {},
  onAddClick = (ev , value) => {},
  onCloseClick = (ev , keyword , index)=>{}
}) => {
const [val , setVal] = useState(value);

useEffect(()=>{
  setVal(value || '');
},[value])

  return (
    <main className="flex flex-col gap-2">
      <header className="flex gap-2">
        <Input
          className="bg-gray-900"
          placeholder={placeholder}
          value={val}
          onInput={(ev) => {
            onInput(ev.target.value);
            setVal(ev.target.value);
          }}
        />
        <SmallButton className="shadow-[unset] bg-gray-900" onClick={(ev)=>{
          onAddClick(ev , val);
        }}>
          {Icons.plus("white")}
        </SmallButton>
      </header>
      {array.length ? (
        <section>
          <Choices className="flex-wrap  px-[unset]" onCloseClick={onCloseClick}  keywords={array} />
        </section>
      ) : null}
    </main>
  );
};
