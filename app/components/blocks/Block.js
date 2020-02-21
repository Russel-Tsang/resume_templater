import React from 'react';

const Block = (props) => {
    if (props.isDragging) return null;
    return (
        <div className={`${props.typeOfBlock} block`} style={props.blockStyle}>
            {props.value}
            {/* <input value={props.value}> */}
        </div>
    );
}

export default Block;