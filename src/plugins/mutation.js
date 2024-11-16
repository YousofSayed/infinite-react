import { uniqueID } from "../helpers/cocktail";

/**
 *
 * @param {import('grapesjs').Editor} editor
 */
export const muatationDomElements = (editor) => {
  editor.on("canvas:frame:load:body", () => {
    const body = editor.Canvas.getBody();
    const observer = new MutationObserver((entries) => {
      entries.forEach((entry) => {
        entry.addedNodes.forEach((node) => {
          node.hasAttribute("_") && _hyperScript.proccesNode(node);
        });
      });
    });

    observer.observe(body, {
      childList: true,
      subtree: true,
    });
  });
};
