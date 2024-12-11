import { cloneObject } from './cocktail';

/**
 * @type {import('grapesjs').Editor}
 */
export let editorType;

/**
 * @type {HTMLElement}
 */
export let refType;

/**
 * @type {HTMLIFrameElement}
 */
export let iframeType;

/**
 * @type {import('grapesjs').Block}
 */
export let blocksType;

/**
 * @type {{[key:number]:string[]}}
 */
export let stateType = {0:[]};

/**
 * @type {CSSStyleDeclaration}
 */
export let animeStylesType = cloneObject({})


/**
 * @type {{name:string , values : {percentage:number , styles:CSSStyleDeclaration}[]}[]}
 */
export let animationsType = Array.from([])

/**
 * @type {import('grapesjs').Trait[]}
 */
export let traitsType = []

/**
 * @type {import('./types').CMD[]}
 */
export let cmdType = []

/**
 * @type {{name : string , value : any}[]}
 */
export let varType = [];

/**
 * @type {import('grapesjs').Page[]}
 */
export let pagesType = []