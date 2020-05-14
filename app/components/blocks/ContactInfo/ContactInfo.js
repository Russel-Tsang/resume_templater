import React, { useState } from 'react';

const ContactInfo = (props) => {
    if (props.isDragging) return null;
    const { address, email, phoneNumber } = props.contactInfo;
    const [showBorderClass, setShowBorderClass] = useState('');

    return (
        <div 
            className={`${props.typeOfBlock} block`} 
            style={props.blockStyle}
            onMouseOver={() => setShowBorderClass('show-border')}
            onMouseLeave={() => setShowBorderClass('')}
        >
            {/* <span>{props.address}</span>
            <span>{props.email}</span>
            <span>{props.phoneNumber}</span> */}
            <input className={showBorderClass} value={address} onChange={(e) => props.onResumeEdit('address')(e.target.value)}/>
            <input className={showBorderClass} value={email} onChange={(e) => props.onResumeEdit('email')(e.target.value)}/>
            <input className={showBorderClass} value={phoneNumber} onChange={(e) => props.onResumeEdit('phoneNumber')(e.target.value)}/>
        </div>
    );
}

export default ContactInfo;