import React from 'react';

const ContactInfo = (props) => {
    if (props.isDragging) return null;
    const { address, email, phoneNumber } = props.contactInfo;

    return (
        <div 
            className={`${props.typeOfBlock} block`} 
            style={props.blockStyle}
            onMouseOver={props.onMouseOver}
            onMouseLeave={props.onMouseLeave}
        >
            <input className={props.className} value={address} onClick={props.onInputClick} onChange={(e) => props.onResumeEdit('address')(e.target.value)}/>
            <input className={props.className} value={email} onClick={props.onInputClick} onChange={(e) => props.onResumeEdit('email')(e.target.value)}/>
            <input className={props.className} value={phoneNumber} onClick={props.onInputClick} onChange={(e) => props.onResumeEdit('phoneNumber')(e.target.value)}/>
        </div>
    );
}

export default ContactInfo;