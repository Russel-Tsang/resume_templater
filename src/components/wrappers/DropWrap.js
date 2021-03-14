import React from 'react';
import { useDrop } from 'react-dnd';

const DropWrap = Component => props => {
    const { acceptType, dropCondition, dropAction, typeOfBlock } = props;

    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: acceptType,
        canDrop: dropCondition || function() { return true } ,
        drop: dropAction,
        collect: monitor => ({ 
            isOver: monitor.isOver(), 
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div className={`drop-wrap-${typeOfBlock}`} ref={dropRef}>
            <Component {...props} isOver={isOver} />
        </div>
    );
}

export default DropWrap;