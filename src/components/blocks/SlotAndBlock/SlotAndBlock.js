import React from 'react';
import styled from 'styled-components';

const SlotAndBlockContainer = styled.div`
    position: relative;
`;

const SlotAndBlock = (props) => {
    return ( 
        <SlotAndBlockContainer style={props.dropWrapStyle}>
            {props.children}
        </SlotAndBlockContainer>
    );
}
 
export default SlotAndBlock;