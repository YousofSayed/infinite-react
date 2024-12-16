import React from "react";
import { Icons } from "../Icons/Icons";
import { Li } from "../Protos/Li";
import { useEditorMaybe } from "@grapesjs/react";

export const HomeNav = () => {
  const editor = useEditorMaybe();

  return (
    <nav className="h-full w-[60px] p-2 flex flex-col justify-between items-center bg-slate-900 ">
      <div className="flex flex-col items-center gap-5">
        <figure className="pb-[25px] border-b-2 border-slate-400">
          {Icons.logo()}
        </figure>
        <ul className="flex flex-col gap-5 items-center">
          {/* <Li>{Icons.plus()}</Li> */}
          <Li
            title="Pages"
            icon={Icons.stNote}
            onClick={(ev) => {
              editor.runCommand("open:pages-manager");
            }}
          />
          <Li title="Dynamic Templates">{Icons.dynamicTemp({})}</Li>
          <Li title="Components" icon={Icons.components} />
          <Li
            title="Database"
            icon={Icons.db}
            onClick={() => {
              editor.runCommand("open:models:modal");
            }}
          />
          <Li title="Media" icon={Icons.gallery} />
          <Li title="Github" icon={Icons.git} />
        </ul>
      </div>

      <div>
        <ul className="flex flex-col gap-5 items-center">
          {/* <Li>{Icons.headphone()}</Li> */}
          <Li title="Settings" icon={Icons.setting} />
          <Li title="Logout" icon={Icons.logOut} />
        </ul>
      </div>
    </nav>
  );
};
