import React from 'react'
import { RecoilRoot } from 'recoil'
import { Wrapper } from './Wrapper'

export const IframeApp = ({children}) => {
  return (
    <RecoilRoot>
        {children}
    </RecoilRoot>
  )
}
