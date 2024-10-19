const app = PetiteVue.createApp();
// let originalScope;

/**
 * Watches the DOM for changes and remounts Petite Vue when necessary.
 * @param {HTMLElement} el
 * @returns
 */
function mutateDom(el) {
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // if(mutation.target instanceof HTMLElement){
      //   console.log('process');
      //   _hyperscript.processNode(document.body)
      // }
      // if (
      //   mutation.type === "attributes" &&
      //   mutation.target.hasAttribute("v-scope") &&
      //   !mutation.target.getAttribute("v-scope")
      // ) {
      //   // Save the original v-scope content before Petite Vue removes it
      //   if (!originalScope) {
      //     originalScope = mutation.target.getAttribute("v-scope");
      //   }
      //   // Use the original v-scope if Petite Vue tries to remove it
      //   mutation.target.setAttribute("v-scope", originalScope);
      //   mutation.target.setAttribute("i-scope", originalScope);
      //   // Optionally, log or apply additional logic
      //   // console.log('Restored v-scope:', originalScope);
      // }
      // if (
      //   mutation.target instanceof HTMLElement &&
      //   mutation.type == 'attributes' &&
      //   mutation.attributeName =='v-scope'
      // ) {
      // if(mutation.target.hasAttribute('scope-done')){
      //   mutation.target.removeAttribute('scope-done');
      //   return;
      // }
      // const scope =   mutation.target.getAttribute('v-scope') || mutation.oldValue;
      // console.log(scope , mutation.target.getAttribute('v-scope') ,  mutation.oldValue );
      // // const scopes = document.querystateAll(`[v-scope]`);
      // // console.log(scopes , 'before mount');
      // const mount = app.mount();
      // mutation.target.setAttribute('v-scope',scope);
      // mutation.target.setAttribute('scope-done','true');
      // // mount.directive((e,n)=>{
      // //   console.log(e,n , 'div');
      // // })
      // // mount.mount(e=>{
      // //   console.log(e , 'munt');
      // // })
      // console.log(scopes);
      // console.log(mount);
      // }else{
      //   app.mount();
      // }
      // if (
      //   mutation.type === "attributes" &&
      //   mutation.target.hasAttribute("i-scope") &&
      //   !mutation.target.getAttribute("v-scope")
      // ) {
      //   // Save the original v-scope content before Petite Vue removes it
      //   if (!originalScope) {
      //     originalScope = mutation.target.getAttribute("v-scope");
      //   }
      //   // Use the original v-scope if Petite Vue tries to remove it
      //   mutation.target.setAttribute(
      //     "v-scope",
      //     mutation.target.getAttribute("i-scope")
      //   );
      //   // Optionally, log or apply additional logic
      //   // console.log('Restored i-scope:', originalScope);
      // }
    });
  });

  mutationObserver.observe(el, {
    attributes: true,
    // attributeOldValue: true,
    characterData: true,
    childList: true,
    subtree: true,
  });

  return mutationObserver;
}

// Initialize MutationObserver on the document body
// mutateDom(document.body);

window.parent.addEventListener(
  "mount:app",
  /**
   *
   * @param {CustomEvent} event
   */
  (event) => {
    const scopes = Array.from(
      document.querystateAll(
        `[v-scope] , [v-for] , [v-model] , [v-text] , [v-effect] , [v-if] , [v-show]`
      )
    ).map((el) => el.cloneNode(true));
    console.log("app mounted", scopes);

    Array.from(document.querystateAll(`[i-for-delete]`)).forEach(el=>{
      !el.hasAttribute('v-for') ? el.remove() : null;
    })

    app.mount();
    scopes.forEach(
      /**
       *
       * @param {HTMLElement} scope
       */
      (scope) => {
        scope.getAttributeNames().forEach((attr) => {
          document
            .querystate(`#${scope.id}`)
            .setAttribute(attr, scope.getAttribute(attr));
        });
        console.log(scope.getAttribute("v-scope"));
      }
    );
    console.log("app after", scopes);
  }
);
