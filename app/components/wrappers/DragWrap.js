import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const DragWrap = Component => props => {
    const { itemType, onMouseDown, blockStyle } = props;
    
    const [showDraggerState, setShowDraggerState] = useState(false);
    const [isGrabbingState, setIsGrabbingState] = useState('grab');
    const [canDragState, setCanDragState] = useState(false);

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: itemType },
        collect: monitor => ({ isDragging: !!monitor.isDragging() }),
        canDrag: canDragState === true
    });


    const Dragger = () => (
        <span
            className='dragger-container'
            style={{ display: 'flex', cursor: isGrabbingState }}
            onMouseDown={() => setIsGrabbingState('grabbing')}
            onMouseUp={() => setIsGrabbingState('grab')}
            onMouseOver={() => setCanDragState(true)}
            onMouseLeave={() => setCanDragState(false)}
        >
            <img
                src="app/images/move_icon.svg"
                className="dragger"
            />
            <img
                src="app/images/move_icon.svg"
                className="dragger"
                style={{ position: 'relative', right: '10px' }}
            />
        </span>
    )

    return ( 
        <div 
            ref={dragRef} 
            className="drag-wrap" 
            onMouseDown={(e) => {
                if (e.target.className === 'resume-input') {
                    e.target.focus();
                }
                onMouseDown();
            }}
            onMouseEnter={ () => setShowDraggerState(true) }
            onMouseLeave={ () => setShowDraggerState(false) }
        >
            <div
                style={{ 
                    height: blockStyle.height, 
                    width: '50px', 
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
            {showDraggerState && Dragger()}
            </div>
            <Component isDragging={isDragging} {...props}/>
        </div>
    );
}

export default DragWrap;