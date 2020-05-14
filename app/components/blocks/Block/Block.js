import React, { useState } from 'react';

const Block = (props) => {
    if (props.isDragging) return null;

    const [showBorderClass, setShowBorderClass] = useState('');
    return (
        <div 
            className={`${props.typeOfBlock} block`} 
            style={props.blockStyle} 
            onMouseOver={() => setShowBorderClass('show-border')} 
            onMouseLeave={() => setShowBorderClass('')}
        >
            {/* {props.value} */}
            <input key={props.key} className={showBorderClass} value={props.value} onChange={(e) => props.onResumeEdit('text')(e.target.value)} />
        </div>
    );
}

export default Block;