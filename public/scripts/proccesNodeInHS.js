window.addEventListener('DOMContentLoaded',()=>{
    const body = document.body;
    const observer = new MutationObserver((entries) => {
      entries.forEach((entry) => {
        entry.addedNodes.forEach((node) => {
          node.hasAttribute("_") && _hyperscript.processNode(node);
        });
      });
    });
    
    observer.observe(body, {
      childList: true,
      subtree: true,
    });
})
