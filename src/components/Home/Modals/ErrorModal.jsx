import React from "react";
import { P } from "../../Protos/P";
import { Button } from "../../Protos/Button";

/**
 * 
 * @param {{editor:import('grapesjs').Editor}} param0 
 * @returns 
 */
export const ErrorModal = ({editor}) => {
  return (
    <section className="flex flex-col gap-4">
      <article className="flex flex-col gap-4 bg-gray-950 p-2 rounded-lg">
        <P>One of the parent is in the symbol.</P>
        <P>Please remove the parent from the symbol and try again.</P>
      </article>

      <footer className="flex items-end">
        <Button onClick={()=>{editor.Modal.close()}}>Close</Button>
      </footer>
    </section>
  );
};
