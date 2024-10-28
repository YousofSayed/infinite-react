import React, { useEffect, useState } from "react";
import { HomeNav } from "../components/Home/HomeNav";
import { HomeHeader } from "../components/Home/HomeHeader";
import { ElementsAside } from "../components/Home/ElementsAside";
import { Iframe } from "../components/Home/Iframe";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { StyleAside } from "../components/Home/StyleAside";
import { GJEditor } from "../components/Home/GJEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { TraitsAside } from "../components/Home/TraitsAside";
import { Aside } from "../components/Home/Protos/Aside";
import { Outlet, Route, Router, Routes } from "react-router-dom";
import { modalDataState, showLayersState } from "../helpers/atoms";
import { Layers } from "../components/Home/Protos/Layers";
import { CustomModals } from "../components/Home/CustomModals";

export const Home = () => {
  const showLayers = useRecoilValue(showLayersState);
  const modalData = useRecoilValue(modalDataState);
  const setModalData = useSetRecoilState(modalDataState);
  const [isClose, setClose] = useState(true);

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
    <GJEditor>
      <main className="relative w-full h-full flex justify-between">
        <HomeNav />
        <section className="w-[calc(100%-60px)] flex flex-col h-full border-l-[1.5px] border-slate-400">
          <HomeHeader />

          <PanelGroup tagName="section" direction="horizontal">
            <Panel
              style={{ display: showLayers ? "block" : "none" }}
              defaultSize={300}
            >
              <Aside dir="right">
                <Layers />
              </Aside>
            </Panel>

            <Panel
              defaultSize={
                showLayers
                  ? Math.trunc(window.innerWidth - 660)
                  : Math.trunc(window.innerWidth - 360)
              }
            >
              <Iframe />
            </Panel>

            <Panel defaultSize={300}>
              <Aside>
                <Outlet />
              </Aside>
            </Panel>
          </PanelGroup>
        </section>

        {!isClose  && <CustomModals />}
      </main>
    </GJEditor>
  );
};
