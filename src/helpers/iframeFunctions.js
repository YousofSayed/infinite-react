import { initDragEvents, initSeperators } from "./dragAndDropHandlers";

/**
 * 
 * @param {MutationRecord} entry 
 * @param {HTMLBodyElement} body 
 */
export const handleIframeDragEls = (entry , body) => {
  const addedNodesWithoutTextNode = Array.from(entry.addedNodes).filter(
    (node) => node.tagName
  );
  addedNodesWithoutTextNode.forEach((node, i) => {
    if (
      !node instanceof HTMLElement ||
      node.classList.contains("seperator") ||
      node.tagName == "button" ||
      node.tagName == "img" ||
      node.tagName == "video" ||
      node.tagName == "audio" ||
      node.hasAttribute("r-once")
    )
      return;

    console.log(entry);

    node.setAttribute("class", node.id);
    initDragEvents(node , body);
    node.children.length <= 0 && initSeperators(node , body);
  });
};
