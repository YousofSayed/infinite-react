import React from "react";
import { HomeNav } from "../components/Home/HomeNav";
import { HomeHeader } from "../components/Home/HomeHeader";
import { ElementsAside } from "../components/Home/ElementsAside";
import { Iframe } from "../components/Home/Iframe";
import { RecoilRoot } from "recoil";
import { StyleAside } from "../components/Home/StyleAside";
import { GJEditor } from "../components/Home/GJEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export const Home = () => {
  console.log(Math.trunc((window.innerWidth - 60) * (30 / 100)));

  return (
    <RecoilRoot>
      <GJEditor>
        <main className="w-full h-full flex justify-between">
          <HomeNav />
          <section className="w-[calc(100%-60px)] flex flex-col h-full border-l-[1.5px] border-slate-400">
            <HomeHeader />


            <PanelGroup direction="horizontal">
              <Panel
                defaultSize={300}
              >
                <StyleAside />
              </Panel>

              <Panel
                defaultSize={Math.trunc((window.innerWidth - 660) )}
              >
                <Iframe />
              </Panel>

            
              <Panel
              className="bg-red-900 w-fit"
                defaultSize={300}
              >
                <ElementsAside />
              </Panel>
            </PanelGroup>
          </section>
        </main>
      </GJEditor>
    </RecoilRoot>
  );
};
