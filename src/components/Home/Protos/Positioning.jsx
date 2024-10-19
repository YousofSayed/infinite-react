import React from 'react'
import { Select } from './Select'
import { positionValues } from '../../../constants/constants'
import { Property } from './Property'
import { DirectionsModel } from './DirectionsModel'
import { SelectStyle } from './SelectStyle'

export const Positioning = () => {
  return (
    <section className="mt-3  flex flex-col gap-3 p-2 rounded-lg bg-gray-900">
        <SelectStyle label='Position' keywords={positionValues} cssProp='position' />
        {/* <Property label='top' cssProp='top' />
        <Property label='right' cssProp='right' />
        <Property label='bottom' cssProp='bottom' />
        <Property label='left' cssProp='left' /> */}
        <DirectionsModel tProp='top' rProp='right' bProp='bottom' lProp='left'/>
        <Property label='z-index' cssProp='z-index' special={true}/>
    </section>
  )
}
