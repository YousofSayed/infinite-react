import React from "react";
import {
  addItemInToolBarForEditor,
  buildScriptFromCmds,
} from "../../helpers/functions";
import _hyperscript from "hyperscript.org";
import { editorIcons } from "../../components/Icons/editorIcons";
import { hsProcessNode } from "../../helpers/customEvents";

/**
 *
 * @param {import('grapesjs').Editor} editor
 */
export const runHsCmdsTool = (editor) => {
  addItemInToolBarForEditor({
    label: editorIcons.runHsCmds,
    editor,
    commandName: `run:hs-cmds`,
    commandCallback(ed) {
      const cmps = editor.getWrapper().find("[inf-cmds]");
      const sle = editor.getSelected();
      const sleId = sle.getEl().id;
      let willSelected;

      cmps.forEach((cmp) => {
        const sympolInfo = editor.Components.getSymbolInfo(cmp);
        const cmpId = cmp.getEl().id;

        if (sympolInfo.isSymbol) {
          const newInstance = editor.Components.addSymbol(cmp);
          const instance = sympolInfo.instances.filter((rel) => rel == cmp)[0];
          const newCmp = cmp.replaceWith(newInstance)[0];
          const newInfo = editor.Components.getSymbolInfo(newCmp);

          const instanceEl = newInfo.instances
            .map((rel) => rel.getEl())
            .filter((rel) => rel == newCmp.getEl())[0];

          const cmds = newCmp.getAttributes()["inf-cmds"];
          const hsScript = buildScriptFromCmds(JSON.parse(cmds));
          newCmp.addAttributes({ _: hsScript });
          hsProcessNode(instanceEl);
        //   editor.refresh({tools:false});

          //     console.log("instance El :", instance.getEl());
          //     const newCmp = instance.replaceWith(
          //       instance.clone({ symbol: sympolInfo.isSymbol })
          //     )[0];
          //     const cmds = newCmp.getAttributes()["inf-cmds"];
          //     const hsScript = buildScriptFromCmds(JSON.parse(cmds));
          //     newCmp.addAttributes({ _: hsScript });
          //     _hyperscript.processNode(newCmp.getEl());
          //     _hyperscript.evaluate('',{
          //         body:editor.Canvas.getBody(),
          //         me:newCmp.getEl(),
          //     })
          //   });
          willSelected = sleId == cmpId ? newCmp : willSelected;
          console.log(sleId, cmpId);

          return;
        }

        const newCmp = cmp.replaceWith(
          cmp.clone({ symbol: sympolInfo.isSymbol })
        )[0];
        const cmds = newCmp.getAttributes()["inf-cmds"];
        const hsScript = buildScriptFromCmds(JSON.parse(cmds));
        newCmp.addAttributes({ _: hsScript });
        hsProcessNode(newCmp.getEl());
        // editor.refresh({tools:false});

        willSelected = sleId == cmpId ? newCmp : willSelected;
      });

      editor.select(willSelected);
    },
  });
};
