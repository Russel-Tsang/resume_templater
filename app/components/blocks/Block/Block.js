import React from 'react';

const Block = (props) => {
    if (props.isDragging) return null;
    return (
        <div className={`${props.typeOfBlock} block`} style={props.blockStyle}>
            {/* {props.value} */}
            <input key={props.key} className="resume-input" value={props.value} onChange={(e) => props.onResumeEdit('text')(e.target.value)} />
        </div>
    );
}

export default Block;