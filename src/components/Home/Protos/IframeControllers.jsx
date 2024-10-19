import React, { useCallback, useEffect, useRef, useState } from "react";
import { Li } from "../../Protos/Li";
import { Icons } from "../../Icons/Icons";
import { useEditorMaybe } from "@grapesjs/react";

export const IframeControllers = () => {
  const editor = useEditorMaybe();

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
      <Li onClick={clearIFrameBody}>{Icons.trash()}</Li>
      <Li onClick={undo}>{Icons.undo()}</Li>
      <Li onClick={redo}>{Icons.redo()}</Li>
      <Li onClick={setComponentsView}>{Icons.square()}</Li>
      <Li to={'/layers'} icon={Icons.layers}/>
    </ul>
  );
};
