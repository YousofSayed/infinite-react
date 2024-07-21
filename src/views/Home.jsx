import React from "react";
import { HomeNav } from "../components/Home/HomeNav";
import { HomeHeader } from "../components/Home/HomeHeader";
import { HomeAside } from "../components/Home/HomeAside";
import { Iframe } from "../components/Home/Iframe";
import { RecoilRoot } from "recoil";

export const Home = () => {
  return (
    <RecoilRoot>
      <main className="w-full h-full flex justify-between">
        <HomeNav />
        <section className="w-[calc(100%-60px)] flex flex-col h-full border-l-[1.5px] border-slate-400">
          <HomeHeader />
          <section className="flex h-full">
            <Iframe />
            <HomeAside />
          </section>
        </section>
      </main>
    </RecoilRoot>
  );
};
