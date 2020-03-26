import React from 'react'; 

const EditBlock = (props) => {
    return ( 
        <div className={`${props.typeOfBlock} block`} style={props.blockStyle}>
            test
        </div>
    );
}
 
export default EditBlock;