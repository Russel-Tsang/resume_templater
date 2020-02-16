import React from 'react';
import { useDrag } from 'react-dnd';

const DragWrap = Component => props => {
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: props.itemType },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    return ( 
        <div className="drag-wrap" ref={dragRef}>
            <Component {...props}/>
        </div>
    );
}
 
export default DragWrap;