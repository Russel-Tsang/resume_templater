import React from 'react';

const Block = (props) => {
    if (props.isDragging) { console.log('isNull'); return null;}
    return (
        <div 
            className={`${props.typeOfBlock} block`} 
            style={props.blockStyle} 
            onMouseOver={props.onMouseOver} 
            onMouseLeave={props.onMouseLeave}
        >
            <input 
                key={props.key} 
                className={props.className}
                value={props.value}
                onClick={props.onInputClick}
                onChange={(e) => props.onResumeEdit('text')(e.target.value)} 
            />
        </div>
    );
}

export default Block;