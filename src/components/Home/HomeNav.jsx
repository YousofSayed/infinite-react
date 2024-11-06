import React from "react";
import { Icons } from "../Icons/Icons";
import { Li } from "../Protos/Li";

export const HomeNav = () => {
  return (
    <nav className="h-full w-[60px] p-2 flex flex-col justify-between items-center bg-slate-900 ">
      <div className="flex flex-col items-center gap-5">
        <figure className="pb-[25px] border-b-2 border-slate-400">
          {Icons.logo()}
        </figure>
        <ul className="flex flex-col gap-5 items-center">
          {/* <Li>{Icons.plus()}</Li> */}
          <Li title="Components">{Icons.components()}</Li>
          <Li title="Pages">{Icons.stNote()}</Li>
          <Li title="Database">{Icons.db()}</Li>
          <Li title="Media">{Icons.gallery()}</Li>
          <Li title="Github">{Icons.git()}</Li>
        </ul>
      </div>

      <div>
        <ul className="flex flex-col gap-5 items-center">
          {/* <Li>{Icons.headphone()}</Li> */}
          <Li title="Settings">{Icons.setting()}</Li>
          <Li title="Logout">{Icons.logOut()}</Li>
        </ul>
      </div>
    </nav>
  );
};
