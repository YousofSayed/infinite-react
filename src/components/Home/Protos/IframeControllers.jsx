import React, { useCallback, useEffect, useRef, useState } from "react";
import { Li } from "../../Protos/Li";
import { Icons } from "../../Icons/Icons";
import { useEditorMaybe } from "@grapesjs/react";
import { useSetRecoilState } from "recoil";
import {
  showAnimationsBuilderState,
  showLayersState,
} from "../../../helpers/atoms";
import { useNavigate } from "react-router-dom";

export const IframeControllers = () => {
  const editor = useEditorMaybe();
  const navigate = useNavigate()
  const setShowLayers = useSetRecoilState(showLayersState);
  const setShowAnimBuilder = useSetRecoilState(showAnimationsBuilderState);

  const undo = () => {
    editor.runCommand("core:undo");
  };

  const redo = () => {
    editor.runCommand("core:redo");
  };

  const clearIFrameBody = () => {
    editor.DomComponents.clear();
  };

  const setComponentsView = () => {
    const command = `core:component-outline`;
    const acitveCommand = Object.keys(editor.Commands.active);
    acitveCommand.includes(command)
      ? editor.stopCommand(command)
      : editor.runCommand(command);
  };

  return (
    <ul className="flex gap-[15px] items-center border-r-2 pr-2 mr-2 border-slate-800">
      <Li onClick={clearIFrameBody} title="clear canvas" icon={Icons.trash} justHover={true}/>
      <Li onClick={undo} title="undo" icon={Icons.undo} justHover={true}/>
      <Li onClick={redo} title="redo" icon={Icons.redo} justHover={true}/>
      <Li onClick={setComponentsView} title="hash elements" icon={Icons.square} justHover={true}/>
      <Li
        onClick={(ev) => {
          setShowLayers((old) => !old);
          setShowAnimBuilder(false);

        }}
        icon={Icons.layers}
        title="show layers"
      />
      <Li
        onClick={(ev) => {
          setShowAnimBuilder((old) => !old);
          setShowLayers(false);
          navigate('edite/styling')
        }}
        title="Animation Builder"
      icon={Icons.animation}/>
    </ul>
  );
};
