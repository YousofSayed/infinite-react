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
import {
  modalDataState,
  showAnimationsBuilderState,
  showCustomModalState,
  showLayersState,
} from "../helpers/atoms";
import { Layers } from "../components/Home/Protos/Layers";
import { CustomModals } from "../components/Home/CustomModals";
import { AnimationsBuilder } from "../components/Home/AnimationsBuilder";
import { Icons, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Home = () => {
  const showLayers = useRecoilValue(showLayersState);
  const showAnimBuilder = useRecoilValue(showAnimationsBuilderState);
  const setModalData = useSetRecoilState(modalDataState);
  const [isClose, setClose] = useState(true);
  const setShowCustomModal = useSetRecoilState(showCustomModalState);
  const showCustomModal = useRecoilValue(showCustomModalState);

  useEffect(() => {
    /**
     *
     * @param {CustomEvent} ev
     */
    const openModal = (ev) => {
      console.log("open");

      setShowCustomModal(true);
      setModalData({
        title: ev.detail.title,
        JSXModal: ev.detail.JSXModal,
      });
    };
    window.addEventListener("open:custom:modal", openModal);
    window.addEventListener("close:custom:modal", (ev) => {
      console.log("close");

      setShowCustomModal(false);
    });
  });

  return (
    <GJEditor>
      <main className="relative w-full h-full bg-gray-950 flex justify-between">
        <ToastContainer
          toastStyle={{ background: " #111827 " }}
          autoClose={3000}
          draggable={true}
          theme="dark"
          // limit={3}
          pauseOnHover={true}
          position="top-left"
          stacked={true}
        />
        <HomeNav />
        <section className="w-[calc(100%-60px)] flex flex-col h-full border-l-[1.5px] border-slate-400">
          <HomeHeader />

          <PanelGroup
            tagName="section"
            className="flex h-full w-full"
            direction="horizontal"
            autoSaveId="panels"
          >
            {(showAnimBuilder || showLayers) && (
              <>
                <Panel defaultSize={300} id="left" order={1}>
                  {showLayers && (
                    <Aside
                      dir="right"
                      // style={{ display: showLayers ? "block" : "none" }}
                    >
                      <Layers />
                    </Aside>
                  )}

                  <Aside
                    style={{ display: showAnimBuilder ? "block" : "none" }}
                  >
                    <AnimationsBuilder />
                  </Aside>
                </Panel>
                <PanelResizeHandle
                  className={`w-[5px] bg-blue-600  opacity-0 hover:opacity-[1] transition-all`}
                />
              </>
            )}

            {/* <Panel
              defaultSize={300}
            >
              <Aside
                dir="right"
                style={{ display: showLayers ? "block" : "none" }}
              >
                <Layers />
              </Aside>

              <Aside style={{ display: showAnimBuilder ? "block" : "none" }}>
                <AnimationsBuilder />
              </Aside>
            </Panel>

            <PanelResizeHandle
              style={{ display: showLayers || showAnimBuilder ? "block" : "none" }}

              className="flex  items-center justify-center   select-none transition-all w-[5px]  h-full  
                 bg-blue-600"
            /> */}

            <Panel id="center" defaultSize={600} order={2}>
              <Iframe />
            </Panel>

            <PanelResizeHandle className="w-[5px] bg-blue-600 opacity-0 hover:opacity-[1] transition-all" />
            <Panel defaultSize={300} id="right" order={3}>
              <Aside>
                <Outlet />
              </Aside>
            </Panel>
          </PanelGroup>
        </section>
        {showCustomModal && <CustomModals />}
        {/* <CustomModals /> */}
      </main>
    </GJEditor>
  );
};
