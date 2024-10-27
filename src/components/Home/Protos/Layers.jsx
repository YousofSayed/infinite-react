import { useEditorMaybe } from '@grapesjs/react'
import React, { useEffect, useRef } from 'react'
import { refType } from '../../../helpers/jsDocs';
import { useRecoilValue } from 'recoil';
import { showLayersState } from '../../../helpers/atoms';

export const Layers = () => {
    const editor = useEditorMaybe();
    const layerSecRef = useRef(refType);
    const showLayers = useRecoilValue(showLayersState);

    useEffect(()=>{
       if(!showLayers || layerSecRef.current.children.length)return;
          
        layerSecRef.current.appendChild(editor.Layers.render())
    })

  return (
   <section id='layers' ref={layerSecRef}>

   </section>
  )
}
