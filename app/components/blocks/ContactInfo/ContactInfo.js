import React from 'react';

const ContactInfo = (props) => {
    if (props.isDragging) return null;
    const { address, email, phoneNumber } = props.contactInfo;

    return (
        <div className={`${props.typeOfBlock} block`} style={props.blockStyle}>
            {/* <span>{props.address}</span>
            <span>{props.email}</span>
            <span>{props.phoneNumber}</span> */}
            <input value={address} onChange={(e) => props.onResumeEdit('address')(e.target.value)}/>
            <input value={email} onChange={(e) => props.onResumeEdit('email')(e.target.value)}/>
            <input value={phoneNumber} onChange={(e) => props.onResumeEdit('phoneNumber')(e.target.value)}/>
        </div>
    );
}

export default ContactInfo;