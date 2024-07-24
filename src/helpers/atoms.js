import { atom } from "recoil";

export const widths = atom({
  key: "widths",
  default: {
    ifrWidth: undefined,
    asideWidth: 300,
  },
});

export const searchWord = atom({
  key:'searchWord',
  default:''
});

export const iframeBody = atom({
  key:'iframeBody',
  default:document.body
});

export const refsStt = atom({
  key:'refs',
  default:{

  }
});

export const showPopupIframState = atom({
  key: "showPopUp",
  default: false,
});
