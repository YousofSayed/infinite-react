/**
 *
 * @param {{selectedEl:HTMLElement}} param0
 */
export const updateSelectedWrapper = ({ selectedEl }) => {
  const ev = new CustomEvent("updateSelectedWrapper", {
    detail: {
      selectedEl,
    },
  });
  window.dispatchEvent(ev);
};

export const ifrmaWindowFocusChange = () => {
  const ev = new CustomEvent("iframeWindowIn");
  window.dispatchEvent(ev);
};

/**
 * 
 * @param {HTMLBodyElement} body 
 */
export const undoRedoEvent = (body)=>{
  const ev = new CustomEvent("undo:redo", {
    detail: {
      bodyInner: body.innerHTML,
    },
  });
  window.dispatchEvent(ev);
}

/**
 * 
 * @param {HTMLElement} el 
 */
export const dispatchCurrentEl =  (el)=>{
  window.parent.dispatchEvent(
    new CustomEvent("currentel", {
      detail: {
        currentEl: el,
      },
    })
  )
};

/**
 * 
 * @param {HTMLElement} el 
 */
export const dispatchVMount = (el)=>{
  window.parent.dispatchEvent(
    new CustomEvent('mount:app',{
      detail:{
        el
      }
    })
  )
}

/**
 * 
 * @param {{title:string , JSXModal:import('react').JSX}} param0 
 * @returns 
 */
export const openCustomModal = ({title , JSXModal})=>{
  return new CustomEvent('open:custom:modal',{
    detail:{
      title,
      JSXModal
    }
  })
}

/**
 * 
 * @param {{title:string , JSXModal:import('react').JSX}} param0 
 * @returns 
 */
export const closeCustomModal = ({title , JSXModal})=>{
  return new CustomEvent('close:custom:modal',{
    detail:{
      title,
      JSXModal
    }
  })
}