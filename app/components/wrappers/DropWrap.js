import React from 'react';
import { useDrop } from 'react-dnd';

const DropWrap = Component => props => {
    const { acceptType, dropCondition, dropAction, dropWrapStyle } = props;

    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: acceptType,
        canDrop: dropCondition || function() { return true } ,
        drop: dropAction,
        collect: monitor => ({ 
            isOver: !!monitor.isOver(), 
            canDrop: !!monitor.canDrop() ,
        }),
    });

    return (
        <div className="drop-wrap" ref={dropRef} style={dropWrapStyle}>
            <Component {...props} />
        </div>
    );
}

export default DropWrap;