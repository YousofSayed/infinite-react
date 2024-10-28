import { closeCustomModal, openCustomModal } from "../helpers/customEvents"

/**
 * 
 * @param {import("grapesjs").Editor} editor 
 */
export function customModal(editor) {
    editor.Commands.add('open:custom:modal',(editor , sender , options)=>{
        window.dispatchEvent(openCustomModal({
            JSXModal:options.JSXModal,
            title:options.title
        }))
    });

    editor.Commands.add('close:custom:modal',(editor , sender , options)=>{
        window.dispatchEvent(closeCustomModal({
            JSXModal:options.JSXModal,
            title:options.title
        }))
    })
}