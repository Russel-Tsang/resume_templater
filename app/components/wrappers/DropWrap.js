import React from 'react';
import { useDrop } from 'react-dnd';

const DropWrap = Component => props => {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: props.acceptType,
        canDrop: props.dropCondition || function() { return true } ,
        drop: () => props.dropAction(props.slotIdx, 'slot'),
        collect: monitor => ({ 
            isOver: !!monitor.isOver(), 
            canDrop: !!monitor.canDrop() ,
        }),
    });

    return (
        <div className="drop-wrap" ref={dropRef} style={props.dropWrapStyle}>
            <Component {...props} />
        </div>
    );
}

export default DropWrap;