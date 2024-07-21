import { atom } from "recoil";

export const widths = atom({
  key: "widths",
  default: {
    ifrWidth: undefined,
    asideWidth: 300,
  },
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
