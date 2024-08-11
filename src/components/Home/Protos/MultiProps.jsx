import React from "react";
import { Button } from "../../Protos/Button";
import { Icons } from "../../Icons/Icons";
import { P } from "../../Protos/P";

export const MultiProps = ({ label }) => {
  return (
    <section className="w-full p-1 px-2 rounded-lg flex justify-between items-center bg-slate-800">
      <P>{label}</P>
      <Button onClick={(ev)=>{
        
      }} className="px-4 py-1 font-semibold">
        <div className="flex justify-between items-center">Add</div>
      </Button>
    </section>
  );
};
