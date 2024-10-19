/**
 * @type {{[key : string] : import('ractive').Decorator}}
 */
export const decorators = {
    'i-text':(node , keypath)=>{
        node.textContent =  this.get(keypath);    
    }
}