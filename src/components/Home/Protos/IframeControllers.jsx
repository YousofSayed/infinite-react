import React, { useCallback, useEffect, useRef, useState } from "react";
import { Li } from "../../Protos/Li";
import { Icons } from "../../Icons/Icons";
import { useEditorMaybe } from "@grapesjs/react";
import { useSetRecoilState } from "recoil";
import { showLayersState } from "../../../helpers/atoms";

export const IframeControllers = () => {
  const editor = useEditorMaybe();
  const setShowLayers = useSetRecoilState(showLayersState);

  const undo = () => {
    editor.runCommand("core:undo");
  };

  const redo = () => {
    editor.runCommand("core:redo");
  };

  const clearIFrameBody = () => {
    // editor.runCommand("core:canvas-clear");
    // editor.Canvas.canvas.clear()
    // editor.Canvas.getCanvasView().cl ;
    editor.DomComponents.clear()
  };

  const setComponentsView = () => {
    const command = `core:component-outline`;
    const acitveCommand = Object.keys(editor.Commands.active);
    acitveCommand.includes(command) ? editor.stopCommand(command) :  editor.runCommand(command);
  };

  return (
    <ul className="flex gap-[15px] items-center border-r-2 pr-2 mr-2 border-slate-800">
      <Li onClick={clearIFrameBody} label="clear canvas">{Icons.trash()}</Li>
      <Li onClick={undo} label="undo">{Icons.undo()}</Li>
      <Li onClick={redo} label="redo">{Icons.redo()}</Li>
      <Li onClick={setComponentsView} label="hash elements">{Icons.square()}</Li>
      <Li onClick={(ev)=>{setShowLayers(old=>!old)}}  icon={Icons.layers} label="show layers"/>
    </ul>
  );
};
