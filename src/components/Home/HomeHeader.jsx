import React, { useRef, useState } from "react";
import { Icons } from "../Icons/Icons";
import { Li } from "../Protos/Li";
import { Button } from "../Protos/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refsStt } from "../../helpers/atoms";
// import { appendStyle } from "../../helpers/functions";
import { IframeControllers } from "./Protos/IframeControllers";
import { useEditorMaybe } from "@grapesjs/react";
import { Input } from "./Protos/Input";
import { transformToNumInput, uniqueID } from "../../helpers/cocktail";

export const HomeHeader = () => {
  const editor = useEditorMaybe();
  const widthRef = useRef("");
  const heightRef = useRef("");
  const customDevice = useRef();

  const setCustomDevice = (prop, value) => {
    prop == "width" && (widthRef.current = value);
    prop == "height" && (heightRef.current = value);
    const uid = uniqueID();

    editor.DeviceManager.remove(customDevice.current);

    customDevice.current = editor.DeviceManager.add({
      name: uid,
      id: uid,
      width: widthRef.current + (widthRef.current && "px") || "100%",
      height: heightRef.current + (heightRef.current && "px") || undefined,
      widthMedia: widthRef.current ? widthRef.current + "px" : undefined,
    });
    console.log(editor.Layers.render());
    

    editor.DeviceManager.select(customDevice.current);
  };

  return (
    <header className="w-full h-[60px] bg-slate-900 border-b-[1.5px] border-slate-400  px-3  flex items-center justify-between">
      <ul className="flex gap-[25px] items-center">
        <Li
          onClick={(ev) => {
            editor.setDevice("Desktop");
          }}
        >
          {Icons.laptop()}
        </Li>
        <Li
          onClick={(ev) => {
            editor.setDevice("tablet");
          }}
        >
          {Icons.taplet()}
        </Li>
        <Li
          onClick={(ev) => {
            editor.setDevice("mobile");
          }}
        >
          {Icons.mopile()}
        </Li>

        <section className="flex items-center gap-4">
          <Input
            onInput={(ev) => {
              transformToNumInput(ev.target);
              setCustomDevice("width", ev.target.value);
            }}
            placeholder="Width"
            className="bg-gray-800 w-[100px] p-[7.5px] font-bold text-sm"
          />

          <Input
            onInput={(ev) => {
              transformToNumInput(ev.target);
              setCustomDevice("height", ev.target.value);
            }}
            placeholder="Height"
            className="bg-gray-800 w-[100px] p-[7.5px] font-bold text-sm"
          />
        </section>
      </ul>

      <div className="flex items-center gap-[10px]">
        <IframeControllers />

        <div className="flex items-center gap-2">
          <ul className="flex items-center gap-2">
            <Li to={"/preview"} icon={Icons.watch} />
            <Li to={"/"} icon={Icons.plus} />
          </ul>

          {/* <Button>Publish</Button> */}
        </div>
      </div>
    </header>
  );
};
