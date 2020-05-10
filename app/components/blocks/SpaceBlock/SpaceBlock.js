import React from 'react';

const SpaceBlock = (props) => {
    if (props.isDragging) return null;
    return (
        <div className={`${props.typeOfBlock} block`} style={props.blockStyle}>
            {props.value}
        </div>
    );
}

export default SpaceBlock;