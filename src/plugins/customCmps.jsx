import React from 'react'
import { Input } from '../Blocks/Input'
import { DynamicText } from '../Blocks/DynamicText';

/**
 * 
 * @param {import('grapesjs').Editor} editor 
 */
export const customCmps = (editor) => {
    Input({editor});
    DynamicText({editor});
}
