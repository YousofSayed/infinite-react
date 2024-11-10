import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalDataState } from "../../helpers/atoms";
import { P } from "../Protos/P";
import { Icons } from "../Icons/Icons";
import { addClickClass } from "../../helpers/cocktail";
import { useEditorMaybe } from "@grapesjs/react";

export const CustomModals = () => {
  const editor = useEditorMaybe();
  const modalData = useRecoilValue(modalDataState);
  const setModalData = useSetRecoilState(modalDataState);
  const [isClose, setClose] = useState(false);

  useEffect(() => {
    /**
     *
     * @param {CustomEvent} ev
     */
    const openModal = (ev) => {
      setClose(false);
      setModalData({
        title: ev.detail.title,
        JSXModal: ev.detail.JSXModal,
      });
    };
    window.addEventListener("open:custom:modal", openModal);
    window.addEventListener("close:custom:modal", (ev) => {
      setClose(true);
    });
  });

  return (
    <section
      onClick={(ev) => {
        editor.Commands.run("close:custom:modal");
      }}
      className={`fixed  z-[55] bg-blur right-0 left-0  w-full h-full flex justify-center items-center`}
    >
      <main
        onClick={(ev) => {
          ev.stopPropagation();
        }}
        className="w-[60%] z-[55] overflow-auto rounded-lg flex flex-col justify-between bg-gray-900"
      >
        <header className="w-full flex items-center   h-[60px] border-l-[5px] border-l-blue-600 border-b-2 bg-gray-900 border-b-slate-600">
          <section className="w-full flex justify-between  items-center p-2">
            <p className="text-slate-300 capitalize select-none font-semibold">
              {modalData.title}
            </p>
            <button
              onClick={(ev) => {
                addClickClass(ev.currentTarget, "click");
                editor.Commands.run("close:custom:modal");
              }}
              className="cursor-pointer z-50 flex items-center  justify-center w-[27px] h-[27px] bg-blue-600 rounded-full"
            >
              {Icons.close("white", undefined, "blue")}
            </button>
          </section>
        </header>

        <section className="h-[calc(100%-70px)] p-2 bg-gray-900">
          {modalData.JSXModal}
        </section>
      </main>
    </section>
  );
};
