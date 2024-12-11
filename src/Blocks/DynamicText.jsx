import { html } from '../helpers/cocktail'

/**
 * 
 * @param {{editor:import('grapesjs').Editor}} param0 
 * @returns 
 */
export const DynamicText = ({editor}) => {
 editor.Components.addType('dynamic text',{
    model:{
        defaults:{
            tagName:'p',
            attributes:{
                class:'dt'
            },
            components:html`Insert Dynamic Text`
        }
    }
 })
}
