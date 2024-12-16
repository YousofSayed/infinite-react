import React from "react";
import { Icons } from "../../Icons/Icons";

export const ToastMsgInfo = ({ msg, onClick = (ev) => {} }) => {
  return (
    <section className="flex justify-between px-2 items-center">
      <p className="text-slate-200 ">{msg}</p>
      <button className="cursor-pointer" onClick={onClick}>
        {Icons.info({ strokeWidth: 2 })}
      </button>
    </section>
  );
};
