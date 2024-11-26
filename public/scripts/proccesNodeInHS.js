// import _hyperscript = require("hyperscript.org");

document.addEventListener('DOMContentLoaded',()=>{
  console.log('DOM Loaded');

    const body = document.body;
    const observer = new MutationObserver((entries) => {
      entries.forEach((entry) => {
        entry.addedNodes.forEach((node) => {
          console.log(eval(node.getAttribute("infinit")) );
          console.log((node.getAttribute("infinit")) );
          
          node.hasAttribute("infinit") && eval(node.getAttribute("infinit")) 
          node.hasAttribute("_") && _hyperscript.processNode(node);
        });
      });
    });
    
    observer.observe(body, {
      childList: true,
      subtree: true,
    });

    body.querySelectorAll(`[infinit]`).forEach(el=>{
      console.log(eval(el.getAttribute("infinit")) );
      console.log((el.getAttribute("infinit")) );
      
    })
  })
  console.log('lol');

  window.parent.addEventListener('hs:process' , (
    /**
     * @type {CustomEvent}
     */
    ev
  )=>{
    _hyperscript.processNode(ev.detail.el)
  })