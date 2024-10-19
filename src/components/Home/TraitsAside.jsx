import React, { useRef } from "react";
import { Input } from "./Protos/Input";
import { useEditorMaybe } from "@grapesjs/react";
import { Aside } from "./Protos/Aside";
import {
  evalBasedOnObjectScope,
  evalObject,
  isValidVFor,
} from "../../helpers/functions";
import { parseToHTML, random } from "../../helpers/cocktail";
import { dispatchVMount } from "../../helpers/customEvents";
import { Button } from "../Protos/Button";
import { AsideControllers } from "./Protos/AsideControllers";


export const TraitsAside = () => {
  const editor = useEditorMaybe();
  /**
   * @type {{current:object}}
   */
  const scopeRef = useRef();
  const elLoopRef = useRef();

  /**
   *
   * @param {InputEvent} ev
   */
  const onInputFor = (ev) => {
    if (isValidVFor(ev.target.value)) {
      /**
       * @type {string}
       */
      const targetedListInScope = ev.target.value;
      const splited = targetedListInScope.split(" ");
      const finalVal = splited[splited.length - 1];

      if (!Object.keys(scopeRef.current).find((key) => key == finalVal)) return;
      console.log("done");

      const sle = editor.getSelected();
      //   const clone = sle.parent().append(sle.getEl().outerHTML)[0];
      //   sle.setAttributes({ "x-for": ev.target.value });

      // const parse = parseToHTML(sle.getEl().outerHTML);
      // parse.hasAttribute("i-text")
      //   ? parse.setAttribute("v-text", parse.getAttribute("i-text"))
      //   : null;

      // Array.from(sle.parent().getEl().children).forEach((comp, i) => {
      //   if (i <= 0) return;
      //   comp.remove();
      // });
      // parse.classList.remove("gjs-selected");

      // parse.setAttribute("v-for", ev.target.value);
      // parse.setAttribute('i-for-delete','true');
      sle.setName('lol')
       sle.addAttributes({"v-for": ev.target.value , 'i-for-delete':'true'}).getEl().outerHTML;
      // sle.parent().append(parse.outerHTML);
      // dispatchVMount(sle.getEl());

      // parse.setAttribute("l-for", ev.target.value);
      // parse.insertAdjacentHTML('beforeend',parse.outerHTML) ;
      // scopeRef.current[finalVal].forEach(element => {
      //   // document.body.insertAdjacentHTML
      // });
      // parse.setAttribute("x-for", ev.target.value);
      // const hsFunction = `
      //   def makeLopp()
      //     log "loler"
      //     for x in $data.${finalVal}
      //     put '${parse.outerHTML}' at end of #${
      //         sle.parent().getEl().id
      //     }
      //     end
      // `
      // sle
      //   .getEl()
      //   .setAttribute(
      //     "_",
      //     ` ${hsFunction} on mutation of anything makeLopp() end`
      //   );
      // sle.parent().append(parse.outerHTML);
      //     const parent = sle.parent();
      //     // const targetClone = sle.clone();
      //    const cmps = parent.components(`${sle.getEl().outerHTML} `)[0]
      //     // const targetCloneSelected = parent.append(targetClone);
      //     // const newComp = parent.append( targetClone.outerHTML,{})

      //     cmps.addAttributes({'v-for':ev.target.value});
      //     editor.select(parent.components()[0]);
    }
  };

  const onInputText = (ev) => {
    const sle = editor.getSelected();
    // sle.addAttributes({ "v-text": ev.target.value });
    // if(evalBasedOnObjectScope(scopeRef.current , ev.target.value)){
    // }
    sle.addAttributes({ "v-text": ev.target.value });
    // dispatchVMount(sle.getEl());

    // sle.addAttributes({ "l-text": ev.target.value });
  };

  const onInpuData = (ev) => {
    const sle = editor.getSelected();
    // sle.setAttributes({'x-data':ev.target.value})

    if (evalObject(ev.target.value)) {
      console.log(evalObject(ev.target.value), "cond");
      sle.setAttributes({ "v-scope": ev.target.value });
      // sle.getEl().setAttribute("_", `init set $data to ${ev.target.value} end`);
      // sle.getEl().setAttribute("l-state", ev.target.value);
      scopeRef.current = evalObject(ev.target.value);
     
    }
  };

  return (
    <>
      <AsideControllers/>
      <section className="flex flex-col gap-4">
        <Input
          placeholder="x-for"
          onInput={onInputFor}
          type="text"
          className="bg-gray-800 w-full"
        />
        <Input
          placeholder="x-text"
          onInput={onInputText}
          type="text"
          className="bg-gray-800 w-full"
        />
        <Input
          placeholder="x-data"
          onInput={onInpuData}
          type="text"
          className="bg-gray-800 w-full"
        />

        <Button onClick={(ev)=>{
           dispatchVMount();
        }}>Loop</Button>
      </section>
    </>
  );
};
