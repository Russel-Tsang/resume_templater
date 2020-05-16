import React, { useState } from 'react';

const ItemTitleWithDate = (props) => {
    if (props.isDragging) return null;
    return (
        <div 
            className={`${props.typeOfBlock} block`} 
            style={props.blockStyle}
            onMouseOver={() => props.borderProps.setBorder(true)}
            onMouseLeave={() => props.borderProps.setBorder(false)}
        >
            <input className={`item-title ${props.borderProps.getClass}`} value={props.itemTitle} onClick={props.borderProps.setInputToActive} onChange={(e) => props.onResumeEdit('itemTitle')(e.target.value)} />
            <input className={`date ${props.borderProps.getClass}`} value={props.date} onClick={props.borderProps.setInputToActive} onChange={(e) => props.onResumeEdit('date')(e.target.value)} />
        </div>
    );
}

export default ItemTitleWithDate;