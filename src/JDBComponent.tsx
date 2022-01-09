import React from 'react'

import {useStyle} from './hooks'
import withContext from './withContext'
interface JDBProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function 
}
const JDBComponent : React.FC<JDBProps> = (props : JDBProps) => {
    const {blockStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            {[0, 1].map(i => (<div onClick = {() => props.onClick()} style = {blockStyle(i)}></div>))}
        </React.Fragment>
    )
}

export default withContext(JDBComponent)