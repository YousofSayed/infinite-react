import React, { useRef, useState } from "react";
import { Icons } from "../Icons/Icons";
import { Li } from "../Protos/Li";
import { IframeControllers } from "./Protos/IframeControllers";
import { useEditorMaybe } from "@grapesjs/react";
import { Input } from "./Protos/Input";
import { transformToNumInput, uniqueID } from "../../helpers/cocktail";

export const HomeHeader = () => {
  const editor = useEditorMaybe();
  const widthRef = useRef("");
  const heightRef = useRef("");
  const customDevice = useRef();
  const [dimansions , setDimaonsion] = useState({
    width:'',
    height:''
  });


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

    editor.DeviceManager.select(customDevice.current);
  };

  return (
    <header className="w-full h-[60px] bg-slate-900 border-b-[1.5px] border-slate-400  px-3  flex items-center justify-between">
      <ul className="flex gap-[25px] items-center">
        <Li
        title="desktop size"
          onClick={(ev) => {
            editor.setDevice("Desktop");
          }}
        >
          {Icons.laptop()}
        </Li>
        <Li
        title="tablet size"
          onClick={(ev) => {
            editor.setDevice("tablet");
          }}
        >
          {Icons.taplet()}
        </Li>
        <Li
          title="mobile size"
          onClick={(ev) => {
            editor.setDevice("mobile");
          }}
        >
          {Icons.mopile()}
        </Li>

        <li className="flex items-center gap-4">
          <Input
            placeholder="Width"
            className="bg-gray-800 w-[100px] p-[7.5px] font-bold text-sm"
            value={dimansions.width}
            onInput={(ev) => {
              transformToNumInput(ev.target);
              setCustomDevice("width", ev.target.value);
              setDimaonsion({...dimansions , width:ev.target.value})
            }}
          />

          <Input
            value={dimansions.height}
            placeholder="Height"
            className="bg-gray-800 w-[100px] p-[7.5px] font-bold text-sm"
            onInput={(ev) => {
              transformToNumInput(ev.target);
              setCustomDevice("height", ev.target.value);
              setDimaonsion({...dimansions , height:ev.target.value})
            }}
          />
        </li>
      </ul>

      <div className="flex items-center gap-[10px]">
        <IframeControllers />

        <div className="flex items-center gap-2">
          <ul className="flex items-center gap-2">
            <Li to={"/preview"} icon={Icons.watch} title="preview mode"/>
            <Li  icon={Icons.save} title="save"/>
            <Li  icon={Icons.export} title="download"/>
            <Li to={"/"} icon={Icons.plus} title="add blocks"/>
          </ul>

          {/* <Button>Publish</Button> */}
        </div>
      </div>
    </header>
  );
};
