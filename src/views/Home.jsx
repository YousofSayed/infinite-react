import React from "react";
import { HomeNav } from "../components/Home/HomeNav";
import { HomeHeader } from "../components/Home/HomeHeader";
import { ElementsAside } from "../components/Home/ElementsAside";
import { Iframe } from "../components/Home/Iframe";
import { RecoilRoot, useRecoilValue } from "recoil";
import { StyleAside } from "../components/Home/StyleAside";
import { GJEditor } from "../components/Home/GJEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { TraitsAside } from "../components/Home/TraitsAside";
import { Aside } from "../components/Home/Protos/Aside";
import { Outlet, Route, Router, Routes } from "react-router-dom";
import { showLayersState } from "../helpers/atoms";
import { Layers } from "../components/Home/Protos/Layers";

export const Home = () => {
  console.log(Math.trunc((window.innerWidth - 60) * (30 / 100)));
  const showLayers = useRecoilValue(showLayersState);
  return (
    <GJEditor>
      <main className="w-full h-full flex justify-between">
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

            <Panel defaultSize={Math.trunc(window.innerWidth - 660)}>
              <Iframe />
            </Panel>

            <Panel defaultSize={300}>
              <Aside>
                <Outlet />
              </Aside>
            </Panel>
          </PanelGroup>
        </section>
      </main>
    </GJEditor>
  );
};
