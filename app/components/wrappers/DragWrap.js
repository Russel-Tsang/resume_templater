import React from 'react';
import { useDrag } from 'react-dnd';

const DragWrap = Component => props => {
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: props.itemType },
        collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    });

    // if component is being dragged, invoke the callback to change this state in index.js
    // if (isDragging) props.setDraggingBlockIdx(props.idx);

    return ( 
        <div className="drag-wrap" ref={dragRef} onMouseDown={() => props.onMouseDown(props.blockIdx, 'draggingBlock')}>
            <Component isDragging={isDragging} {...props}/>
        </div>
    );
}
 
export default DragWrap;