import React from 'react';
import { Aside } from './Protos/Aside';
import { Details } from './Protos/Details';
import { StyleLayout } from './Protos/StyleLayout';

export const StyleAside = () => {
  return (
    <Aside dir='right'>
        <Details>
            <StyleLayout/>
        </Details>
    </Aside>
  )
}
