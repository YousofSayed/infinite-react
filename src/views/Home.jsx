import React from "react";
import { HomeNav } from "../components/Home/HomeNav";
import { HomeHeader } from "../components/Home/HomeHeader";
import { ElementsAside } from "../components/Home/ElementsAside";
import { Iframe } from "../components/Home/Iframe";
import { RecoilRoot } from "recoil";
import { StyleAside } from "../components/Home/StyleAside";

export const Home = () => {
  return (
    <RecoilRoot>
      <main className="w-full h-full flex justify-between">
        <HomeNav />
        <section className="w-[calc(100%-60px)] flex flex-col h-full border-l-[1.5px] border-slate-400">
          <HomeHeader />
          <section className="flex h-[calc(100%-60px)]">
            <StyleAside/>
            <Iframe />
            <ElementsAside />
          </section>
        </section>
      </main>
    </RecoilRoot>
  );
};
