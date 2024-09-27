import React from "react";
import { atom } from "recoil";

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
  key:'blocks',
  default: blocksType
})

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
 * @type {{currentEl:HTMLElement , addStyle:({[cssProp:string]:string})}}
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

