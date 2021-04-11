import React, { useState, useContext } from 'react';
import { useDrag } from 'react-dnd';
import { Context as templaterContext } from '@components/ResumeTemplater/context';

const DragWrap = Component => props => {
    const { itemType, onDraggerMouseDown, onDraggerMouseUp, blockStyle, grabState, canDragState, onDragEnd } = props;
    const { state: templaterState } = useContext(templaterContext);
    
    const [showDraggerState, setShowDraggerState] = useState(false);

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: itemType },
        canDrag: templaterState.canDragState === true,
        end: (item, monitor) => onDragEnd(),
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });


    const Dragger = () => (
        <div
            className='dragger-img-container'
            style={{ display: 'flex' }}
        >
            <img
                src="src/images/move_icon.svg"
                className="dragger-img"
            />
            <img
                src="src/images/move_icon.svg"
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