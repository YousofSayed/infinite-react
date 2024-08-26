import { atom } from "recoil";

export const widths = atom({
  key: "widths",
  default: {
    ifrWidth: undefined,
    asideWidth: 300,
  },
});

export const searchWord = atom({
  key: "searchWord",
  default: "",
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

export const undoAndRedoState = atom({
  key:'undoAndRedoState',
  default:{
    isStyle:false,
    styleInner:['']
  }
});

/**
 * @type {{[key:string]:HTMLElement}}
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
 * @type {HTMLElement}
 */
let currentElType;

export const currentElState = atom({
  key: "currentEl",
  default: currentElType,
});
