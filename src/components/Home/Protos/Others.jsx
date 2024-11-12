import React from 'react'
import { Property } from './Property'
import { SelectStyle } from './SelectStyle'
import { touchActionValues } from '../../../constants/constants'

export const Others = () => {
  return (
    <section className='mt-3 flex flex-col gap-2 w-full'>
        <Property label='user-select' cssProp='user-select'/>
        <Property label='transition' cssProp='transition'/>
        <Property label='tab-size' cssProp='tab-size'/>
        <SelectStyle label='transition' cssProp='empty-cells' keywords={['show' , 'hide']}/>
        <SelectStyle label='touch-action' cssProp='touch-action' keywords={touchActionValues}/>
    </section>
  )
}
