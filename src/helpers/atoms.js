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

export const iframeBody = atom({
  key: "iframeBody",
  default: document,
});

export const iframeWindow = atom({
  key: "iframeWindow",
  default: window,
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
