import React from 'react';

const ContactInfo = (props) => {
    return (  
        <div class="contact-info block">
            <span>{props.address}</span>
            <span>{props.email}</span>
            <span>{props.phone}</span>
        </div>
    );
}
 
export default ContactInfo;