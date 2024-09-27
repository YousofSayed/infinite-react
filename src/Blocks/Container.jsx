import { useNode } from '@craftjs/core'
import React from 'react'

export const Container = ({children}) => {
  const {connectors:{connect,drag}} = useNode();
  return (
    <section ref={(ref)=>connect(drag(ref))} className='border-2 border-blue-600'>
      {children}
    </section>
  )
}
  