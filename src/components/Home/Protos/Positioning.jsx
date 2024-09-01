import React from 'react'
import { Select } from './Select'
import { positionValues } from '../../../constants/constants'
import { Property } from './Property'

export const Positioning = () => {
  return (
    <section className="mt-3  flex flex-col gap-2 p-2 rounded-lg bg-gray-900">
        <Select label='Position' keywords={positionValues} cssProp='position' />
        <Property label='top' cssProp='top' />
        <Property label='right' cssProp='right' />
        <Property label='bottom' cssProp='bottom' />
        <Property label='left' cssProp='left' />
        <Property label='z-index' cssProp='z-index' special={true}/>
        <Property label='order' cssProp='order' special={true} />
    </section>
  )
}
