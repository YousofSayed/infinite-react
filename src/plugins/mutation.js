import _hyperscript from "hyperscript.org";
import { uniqueID } from "../helpers/cocktail";
import { buildScriptFromCmds } from "../helpers/functions";
import { hsProcessNode } from "../helpers/customEvents";

/**
 *
 * @param {import('grapesjs').Editor} editor
 */
export const muatationDomElements = (editor) => {
  editor.on("canvas:frame:load:body", () => {
    const body = editor.Canvas.getBody();
    const observer = new MutationObserver((entries) => {
      entries.forEach((entry) => {
        //Main Node
        editor.refresh({tools:false});
        // editor.Canvas.refresh({})
        const mainNode = entry.target;
        const id = mainNode.id;
        const isComponent = editor.Components.isComponent(editor.Components.getById(id));
        console.log('main is' , isComponent);
        
        if(isComponent || !mainNode.hasAttribute("inf-cmds"))return;
        const hsScript = mainNode.getAttribute("inf-cmds");
        mainNode.setAttribute("_", buildScriptFromCmds(JSON.parse(hsScript)));
        hsProcessNode(mainNode);


        //Added Nodes
        [...entry.addedNodes]
          .filter((node) => node.tagName)
          .forEach((node) => {
            console.log(node);
            const id = node.id;
            const isComponent = editor.Components.isComponent(
              editor.Components.getById(id)
            );
            console.log('node is ' , isComponent);
            
            if (isComponent || !node.hasAttribute("inf-cmds")) return;

            const hsScript = node.getAttribute("inf-cmds");
            node.setAttribute("_", buildScriptFromCmds(JSON.parse(hsScript)));
            hsProcessNode(node);
          });
      });
    });

    observer.observe(body, {
      childList: true,
      subtree: true,
    });
  });
};
