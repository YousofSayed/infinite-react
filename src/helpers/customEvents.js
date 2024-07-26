/**
 * 
 * @param {string} detail 
 * @returns 
 */
export const iframeBodyChange = (detail)=> {
  const csv =  new CustomEvent('iframeBodyChange',{
        detail,
    
    });

    window.dispatchEvent(csv);
};

