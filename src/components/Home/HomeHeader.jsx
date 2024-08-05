import React from "react";
import { Icons } from "../Icons/Icons";
import { Li } from "../Protos/Li";
import { Button1 } from "../Protos/Button1";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refsStt } from "../../helpers/atoms";
// import { appendStyle } from "../../helpers/functions";
import { IframeControllers } from "./Protos/IframeControllers";

export const HomeHeader = () => {
  const iframe= useRecoilValue(refsStt).ifrRef;

  

  return (
    <header className="w-full h-[60px] bg-slate-900 border-b-[1.5px] border-slate-400  px-3  flex items-center justify-between">
      <ul className="flex gap-[25px] items-center">
        <Li>{Icons.laptop()}</Li>
        <Li>{Icons.taplet()}</Li>
        <Li>{Icons.mopile()}</Li>
      </ul>

      <div className="flex items-center gap-[10px]">
        <IframeControllers/>

        <div className="flex items-center gap-2">
          <ul>
            <Li>{Icons.watch(undefined)}</Li>
          </ul>

          <Button1 text={"Publish"} />
        </div>
      </div>
    </header>
  );
};
