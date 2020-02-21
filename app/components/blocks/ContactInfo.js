import React from 'react';

const ContactInfo = (props) => {
    if (props.isDragging) return null;
    return (  
        <div className="contact-info block" style={props.blockStyle}> 
            <span>{props.address}</span>
            <span>{props.email}</span>
            <span>{props.phoneNumber}</span>
        </div>
    );
}
 
export default ContactInfo;