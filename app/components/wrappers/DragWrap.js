import React from 'react';
import { useDrag } from 'react-dnd';

const DragWrap = Component => props => {
    const { itemType, onMouseDown } = props;

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: itemType },
        collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    });

    // if component is being dragged, invoke the callback to change this state in index.js
    // if (isDragging) props.setDraggingBlockIdx(props.idx);

    return ( 
        <div ref={dragRef} className="drag-wrap" onMouseDown={onMouseDown}>
            <Component isDragging={isDragging} {...props}/>
        </div>
    );
}
 
export default DragWrap;