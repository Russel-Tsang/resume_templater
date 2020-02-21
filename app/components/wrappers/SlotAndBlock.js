import React from 'react';
// import Slot from '../blocks/Slot';
// import Name from '../blocks/Name';

const SlotAndBlock = (props) => {
    return ( 
        <div className="slot-and-block">
            {props.children}
        </div>
    );
}
 
export default SlotAndBlock;