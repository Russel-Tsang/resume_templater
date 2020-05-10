import React, { useState } from 'react';
// import { DragSource } from 'react-dnd';
import { useDrag } from 'react-dnd';

// const DragWrap = Component => props => {
//     const { itemType, onMouseDown } = props;
//     const [draggerState, setDraggerState] = useState(false);

//     const [{ isDragging }, dragRef] = useDrag({
//         item: { type: itemType },
//         collect: monitor => ({ isDragging: !!monitor.isDragging() }),
//         // canDrag: draggerState === true
//     });

//     // if component is being dragged, invoke the callback to change this state in index.js
//     // if (isDragging) props.setDraggingBlockIdx(props.idx);

//     return ( 
//         <div ref={(e) => {console.log(dragRef); dragRef();}} className="drag-wrap" onMouseDown={onMouseDown}>
//             <Component isDragging={isDragging} {...props}/>
//             <div 
//                 className="dragger" 
//                 onMouseDown={() => setDraggerState(true)} 
//                 onMouseUp={() => setDraggerState(false)} 
//                 style={{ height: '20px', width: '50px', backgroundColor: "red" }}
//             />
//         </div>
//     );
// }
 
// export default DragWrap;

const DragWrap = Component => props => {
    const { itemType, onMouseDown } = props;
    // const type

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: itemType },
        collect: monitor => ({ isDragging: !!monitor.isDragging() }),
        // canDrag: draggerState === true
    });

    return ( 
        <div 
            ref={dragRef} 
            className="drag-wrap" 
            onMouseDown={(e) => {
                console.log(e.target.className);
                if (e.target.className === 'resume-input') {
                    e.target.focus();
                }
                else onMouseDown();
            }}
        >
            <Component isDragging={isDragging} {...props}/>
            <div 
                className="dragger" 
                onMouseDown={() => setDraggerState(true)} 
                onMouseUp={() => setDraggerState(false)} 
                style={{ height: '20px', width: '50px', backgroundColor: "red" }}
            />
        </div>
    );
}

export default DragWrap;