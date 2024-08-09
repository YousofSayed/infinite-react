import React from "react";

const BorderLabel = ({ label, borderColor }) => (
  <div
    className={`absolute w-full h-full border-2 border-${borderColor} border-dashed`}
  >
    <p
      className={`w-[60px] py-[1px] flex justify-center items-center rounded-xl font-semibold capitalize text-white text-[12px] absolute top-[-18px] left-[-5px] bg-gray-900`}
    >
      {label}
    </p>
  </div>
);

const Dimantions = ({ top = 0, right = 0, bottom = 0, left = 0 }) => (
  <>
    <div className="absolute w-full flex justify-center items-center h-[25px] top-0 text-slate-200 font-bold">
      {top}
    </div>
    <div className="absolute w-full flex justify-center items-center h-[25px] bottom-0 text-slate-200 font-bold">
      {bottom}
    </div>
    <div className="absolute w-[25px] h-full flex justify-center items-center right-0 text-slate-200 font-bold">
      {right}
    </div>
    <div className="absolute w-[25px] h-full flex justify-center items-center left-0 text-slate-200 font-bold">
      {left}
    </div>
  </>
);

export const StyleLayout = ({}) => {
  return (
    <section className="my-5 flex justify-center ">
      <div className="relative min-w-[100%] max-w-[300px] min-h-[250px] max-h-[300px] flex justify-center items-center bg-slate-800">
        <BorderLabel borderColor={"slate-400"} label={"margin"} />
        <Dimantions top={0} right={0} bottom={0} left={0} />
        <div className="relative w-[calc(100%-60px)] h-[calc(100%-60px)] flex justify-center items-center bg-slate-700">
          <BorderLabel borderColor={"slate-400"} label={"padding"} />
          <Dimantions top={0} right={0} bottom={0} left={0} />
          <div
            className={`relative w-[calc(100%-60px)] h-[calc(100%-60px)] flex justify-center items-center bg-slate-600`}
          >
            <BorderLabel borderColor={"slate-400"} label={"border"} />
            <Dimantions top={0} right={0} bottom={0} left={0} />
            <div className="w-[80px] h-[35px] text-slate-200 flex justify-center items-center border-2 border-dotted  bg-slate-500">
                0 X 0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
