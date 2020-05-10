import React from 'react';

const ItemTitleWithDate = (props) => {
    if (props.isDragging) return null;
    return (
        <div className={`${props.typeOfBlock} block`} style={props.blockStyle}>
            <span><b>{props.itemTitle}</b></span>
            <span><i>{props.date}</i></span>
        </div>
    );
}

export default ItemTitleWithDate;