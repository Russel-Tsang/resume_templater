import React from 'react';

const ContactInfo = (props) => {
    if (props.isDragging) return null;
    const { address, email, phoneNumber } = props.contactInfo;

    return (
        <div 
            className={`${props.typeOfBlock} block`} 
            style={props.blockStyle}
            onMouseOver={() => props.borderProps.setBorder(true)}
            onMouseLeave={() => props.borderProps.setBorder(false)}
        >
            <input className={props.borderProps.getClass} value={address} onClick={props.borderProps.setInputToActive} onChange={(e) => props.onResumeEdit('address')(e.target.value)}/>
            <input className={props.borderProps.getClass} value={email} onClick={props.borderProps.setInputToActive} onChange={(e) => props.onResumeEdit('email')(e.target.value)}/>
            <input className={props.borderProps.getClass} value={phoneNumber} onClick={props.borderProps.setInputToActive} onChange={(e) => props.onResumeEdit('phoneNumber')(e.target.value)}/>
        </div>
    );
}

export default ContactInfo;