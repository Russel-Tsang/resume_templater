import React from 'react';

const ItemTitleWithDate = (props) => {
    if (props.isDragging) return null;
    return (
        <div className={`${props.typeOfBlock} block`} style={props.blockStyle}>
            {/* <span><b>{props.itemTitle}</b></span>
            <span><i>{props.date}</i></span> */}
            <input className="item-title" value={props.itemTitle} onChange={(e) => props.onResumeEdit('itemTitle')(e.target.value)} />
            <input className="date" value={props.date} onChange={(e) => props.onResumeEdit('date')(e.target.value)} />
        </div>
    );
}

export default ItemTitleWithDate;