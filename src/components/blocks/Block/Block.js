import React, { useState } from 'react';

const Block = (props) => {
    if (props.isDragging) { console.log('isNull'); return null;}
    return (
        <div 
            className={`${props.typeOfBlock} block`} 
            style={props.blockStyle} 
            onMouseOver={() => props.borderProps.setBorder(true)} 
            onMouseLeave={() => props.borderProps.setBorder(false)}
        >
            {/* {props.value} */}
            <input 
                key={props.key} 
                className={props.borderProps.getClass}
                value={props.value}
                onClick={props.borderProps.setInputToActive}
                onChange={(e) => props.onResumeEdit('text')(e.target.value)} 
            />
        </div>
    );
}

export default Block;