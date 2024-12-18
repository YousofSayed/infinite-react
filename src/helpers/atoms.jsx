import React from "react";
import { atom } from "recoil";
import {
  animeStylesType,
  cmdType,
  restModelType,
  sharedLayerType,
  varType,
} from "./jsDocs";

export const widths = atom({
  key: "widths",
  default: {
    leftAside: 300,
    rightAside: 300,
  },
});

export const searchWord = atom({
  key: "searchWord",
  default: "",
});

/**
 * @type {import('grapesjs').Block[]}
 */
let blocksType = [];

export const blocksStt = atom({
  key: "blocks",
  default: blocksType,
});

/**
 * @type {Document}
 */
let initValTypeDocument;
export const ifrDocument = atom({
  key: "iframeDocument",
  default: initValTypeDocument,
});

export const iframeWindow = atom({
  key: "iframeWindow",
  default: window,
});

export const mediaHandlerState = atom({
  key: "mediaHandlerState",
  default: {
    isMedia: false,
    mediaWidth: 0,
    mediaHeight: 0,
  },
});

export const undoAndRedoStates = atom({
  key: "undoAndRedoStates",
  default: {
    isStyle: false,
    isDropping: true,
  },
});

/**
 * @type {{iframe:HTMLIFrameElement , blocksStyle:HTMLStyleElement , [key:string]:HTMLElement}}
 */
let refsSttType = {};

export const refsStt = atom({
  key: "refs",
  default: refsSttType,
});

export const showOverlayIframState = atom({
  key: "showOverlay",
  default: false,
});

/**
 * @let
 * @type {{render:(children:React.ReactNode)=>void}}
 */
let render;

export const iframeRoot = atom({
  key: "iframeRoot",
  default: render,
});

/**
 * @let
 * @type {{currentEl:import('grapesjs').Component | HTMLElement , addStyle:({[cssProp:string]:string})}}
 */
let currentElType = {
  currentEl: null,
};
export const currentElState = atom({
  key: "currentEl",
  default: currentElType,
});

/**
 * @type {import('grapesjs').Editor}
 */
let editor;

export const editorStt = atom({
  key: "editor",
  default: editor,
});

let rule = { is: false, ruleString: "" };

export const ruleState = atom({
  key: "ruleState",
  default: rule,
});

export const selectorState = atom({
  key: "selectorState",
  default: "",
});

export const showLayersState = atom({
  key: "showLayers",
  default: false,
});

export const cssPropForAssetsManagerState = atom({
  key: "cssPropForAssetsManagerState ",
  default: "",
});

export const modalDataState = atom({
  key: "modalDataState",
  default: {
    title: "",
    JSXModal: <section></section>,
  },
});

export const showAnimationsBuilderState = atom({
  key: "showAnimationsBuilderState",
  default: false,
});

export const animeStylesState = atom({
  key: "animeStyles",
  default: animeStylesType,
});

export const framesStylesState = atom({
  key: "framesValueState",
  default: animeStylesType,
});

export const showCustomModalState = atom({
  key: "showCustomModal",
  default: false,
});

export const previewContentState = atom({
  key: "previewContentState",
  default: {
    scripts: {},
    styles: {},
    html: "",
    css: "",
  },
});

export const showPreviewState = atom({
  key: "showPreviewState",
  default: false,
});

export const removeAllActivesState = atom({
  key: "removeAllActives",
  default: false,
});

export const cmdsBuildState = atom({
  key: `cmdsBuildState`,
  default: cmdType,
});

export const varsState = atom({
  key: `globalVarsState`,
  default: varType,
});

export const restModelState = atom({
  key: "restModelState",
  default: restModelType,
});

export const sharedLayerState = atom({
  key: "layerSharedState",
  default: sharedLayerType,
});
