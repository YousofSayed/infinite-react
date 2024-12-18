import React, { useState } from "react";
import { SmallButton } from "../SmallButton";
import { Icons } from "../../../Icons/Icons";
import { Input } from "../Input";
import { Select } from "../Select";
import { useRecoilValue } from "recoil";
import { varsState } from "../../../../helpers/atoms";
import { hsZoo } from "../../../../constants/constants";

export const ObjectInput = ({
  obj = {},
  onAddClick = (ev, key, value) => {},
  onDelete = (ev, key, value) => {},
  keywords=[],
  isRelative=false
}) => {
  //   const [obj, setObj] = useState({
  //     name: "yousef",
  //     age: 22,
  //     wife: "not-yet 😥 😥😥😥😥😥😥",
  //   });
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const vars = useRecoilValue(varsState);

  return (
    <main className="w-full flex flex-col gap-2">
      <header className="relative w-full flex gap-2">
        <section className="w-full flex gap-2 text-white font-bold justify-between ">
          <Input
            value={key}
            className="w-full bg-gray-900"
            type="text"
            placeholder="Key"
            onInput={(ev) => {
              setKey(ev.target.value);
            }}
          />
          <span className="self-center">:</span>
          <Select
            value={value}
            keywords={keywords}
            isRelative={isRelative}
            className="w-full  bg-gray-900 "
            // inputClassName=""
            type="text"
            placeholder="Value"
            onAll={(value) => {
              setValue(value);
            }}
          />
        </section>
        <SmallButton
          className="flex-shrink-0 bg-gray-900"
          onClick={(ev) => {
            onAddClick(ev, key, value);
            setKey('');
            setValue('')
          }}
        >
          {Icons.plus("white")}
        </SmallButton>
      </header>

      {Object.keys(obj).length
        ? Object.keys(obj).map((propKey, i) => {
            return (
              <ul
                key={i}
                className="flex flex-col gap-2 w-full px-1 py-2 border-[2px] rounded-lg border-blue-600 bg-gray-950"
              >
                <li className="flex gap-2 text-white px-1 font-bold relative">
                  <p className="w-full flex items-center overflow-auto text-nowrap bg-gray-900 p-2 rounded-lg text-slate-300">
                    {propKey}
                  </p>
                  <span className="self-center">:</span>
                  <Select
                  isRelative={false}
                    keywords={[...hsZoo , ...vars]}
                    inputClassName=""
                    value={obj[propKey]}
                    className="p-[2px] px-[2px] bg-gray-900"
                  >
                    {obj[propKey]}
                  </Select>
                  <SmallButton
                    onClick={(ev) => {
                      onDelete(ev, propKey, obj[propKey]);
                    }}
                    className="flex-shrink-0 bg-gray-900 shadow-[unset] "
                  >
                    {Icons.delete("white")}
                  </SmallButton>
                </li>
              </ul>
            );
          })
        : null}
    </main>
  );
};
