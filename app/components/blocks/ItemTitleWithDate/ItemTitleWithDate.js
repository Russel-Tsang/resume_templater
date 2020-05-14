import React, { useState } from 'react';

const ItemTitleWithDate = (props) => {
    if (props.isDragging) return null;
    const [showBorderClass, setShowBorderClass] = useState('');
    return (
        <div 
            className={`${props.typeOfBlock} block`} 
            style={props.blockStyle}
            onMouseOver={() => setShowBorderClass('show-border')}
            onMouseLeave={() => setShowBorderClass('')}
        >
            <input className={`item-title ${showBorderClass}`} value={props.itemTitle} onChange={(e) => props.onResumeEdit('itemTitle')(e.target.value)} />
            <input className={`date ${showBorderClass}`} value={props.date} onChange={(e) => props.onResumeEdit('date')(e.target.value)} />
        </div>
    );
}

export default ItemTitleWithDate;