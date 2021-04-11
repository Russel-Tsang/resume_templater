import React from 'react';

const ItemTitleWithDate = (props) => {
    if (props.isDragging) return null;
    return (
        <div 
            className={`${props.typeOfBlock} block`} 
            style={props.blockStyle}
            onMouseOver={props.onMouseOver}
            onMouseLeave={props.onMouseLeave}
        >
            <input className={`item-title ${props.className}`} value={props.itemTitle} onClick={props.onInputClick} onChange={(e) => props.onResumeEdit('itemTitle')(e.target.value)} />
            <input className={`date ${props.className}`} value={props.date} onClick={props.onInputClick} onChange={(e) => props.onResumeEdit('date')(e.target.value)} />
        </div>
    );
}

export default ItemTitleWithDate;