import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const DragWrap = Component => props => {
    const { itemType, onDraggerMouseDown, onDraggerMouseUp, blockStyle, grabState, canDragState, onDragEnd } = props;
    
    const [showDraggerState, setShowDraggerState] = useState(false);

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: itemType },
        canDrag: canDragState === true,
        end: (item, monitor) => onDragEnd(),
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });


    const Dragger = () => (
        <div
            className='dragger-img-container'
            style={{ display: 'flex' }}
        >
            <img
                src="app/images/move_icon.svg"
                className="dragger-img"
            />
            <img
                src="app/images/move_icon.svg"
                className="dragger-img"
                style={{ position: 'relative', right: '10px' }}
            />
        </div>
    )

    return ( 
        <div 
            ref={dragRef} 
            className="drag-wrap" 
            onMouseEnter={() => setShowDraggerState(true)}
            onMouseLeave={() => setShowDraggerState(false)}
        >
            <div
                style={{ 
                    height: blockStyle.height, 
                    width: '30px', 
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: grabState
                }}
                className="dragger"
                onMouseDown={onDraggerMouseDown}
                onMouseUp={onDraggerMouseUp}
            >
            {showDraggerState && Dragger()}
            {/* {Dragger()} */}
            </div>
            <Component isDragging={isDragging} {...props}/>
        </div>
    );
}

export default DragWrap;