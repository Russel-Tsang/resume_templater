import React, { useContext } from 'react';
import SpaceBlock from "../components/blocks/SpaceBlock";
import Block from "../components/blocks/Block";
import Slot from "../components/blocks/Slot";
import SlotAndBlock from "../components/blocks/SlotAndBlock";
import ContactInfo from "../components/blocks/ContactInfo";
import ItemTitleWithDate from "../components/blocks/ItemTitleWithDate";
import { BlockTypes, ItemTypes, BlockStyles, TemplaterStateTypes } from "@constants";
import { Context as templaterContext } from '@components/ResumeTemplater/context'

/************************************
 FUTURE: Function to flatten JSON
 from database for easier traversal 
 mapping traversal on the frontend
 ************************************/

// export const flattenJSON = function(json) {
    
// }

/************************************
 Function to return proper React
 Component based on data 'type'
 ************************************/

export const useComponentFor = function() {
    // closure usage of useContext respects rule of not calling hooks inside loops
    const { state, dispatch: templaterDispatch } = useContext(templaterContext);

    return {
        componentFor(blockOptions, idx) {
            const { BLOCK_DROPPED } = TemplaterStateTypes;
        
            return (
                <SlotAndBlock
                    key={idx}
                    acceptType={ItemTypes.BLOCK}
                    dropAction={() => templaterDispatch({ type: BLOCK_DROPPED, payload: { idx } })}
                    dropWrapStyle={BlockStyles[blockOptions.type]}
                    typeOfBlock={blockOptions.type}
                >
                    {getCorrectDragBlock(blockOptions, idx)}
                    <Slot slotStyle={BlockStyles[blockOptions.type]}/>
                </SlotAndBlock>
            );
        }
    }

    function getCorrectDragBlock(blockOptions, idx) {
        const { NAME, CONTACT_INFO, SECTION_TITLE, ITEM_TITLE_WITH_DATE, ITEM_CAPTION, BULLET_POINT, SPACE_BLOCK } = BlockTypes;
        const { DRAGGER_MOUSE_DOWN, DRAGGER_MOUSE_UP, RESUME_TEXT_CHANGE, SET_BORDER, SET_INPUT_TO_ACTIVE } = TemplaterStateTypes;
    
        const commonProps = {
            itemType: ItemTypes.BLOCK,
            typeOfBlock: blockOptions.type,
            onDraggerMouseDown: () => templaterDispatch({ type: DRAGGER_MOUSE_DOWN, payload: { idx } }),
            onDraggerMouseUp: () => templaterDispatch({ type: DRAGGER_MOUSE_UP }),
            onDragEnd: () => templaterDispatch({ type: DRAGGER_MOUSE_UP }),
            grabState: state.grabState,
            canDragState: state.canDragState,
            blockStyle: BlockStyles[blockOptions.type],
            onResumeEdit: (field) => (inputText) => templaterDispatch({ type: RESUME_TEXT_CHANGE, payload: { idx, field, inputText } }),
            className: state.borderClasses.state[idx],
            onMouseOver: () => templaterDispatch({ type: SET_BORDER, payload: { idx, setBorder: true } }),
            onMouseLeave: () => templaterDispatch({ type: SET_BORDER, payload: { idx, setBorder: false } }),
            onInputClick: () => templaterDispatch({ type: SET_INPUT_TO_ACTIVE, payload: { idx } })
        }
    
        switch (blockOptions.type) {
            case NAME:
            case ITEM_CAPTION:
            case BULLET_POINT:
            case SECTION_TITLE:
                return (
                    <Block
                        {...commonProps}
                        value={blockOptions.text}
                    />
                );
            case CONTACT_INFO:
                const { address, email, phoneNumber } = blockOptions;
                return (
                    <ContactInfo
                        {...commonProps}
                        contactInfo={{ address, email, phoneNumber }}
                    />
                );
            case ITEM_TITLE_WITH_DATE:
                return (
                    <ItemTitleWithDate
                        {...commonProps}
                        itemTitle={blockOptions.itemTitle}
                        date={blockOptions.date}
                    />
                );
            case SPACE_BLOCK:
                return (
                    <SpaceBlock {...commonProps} />
                ); 
        }
    }
}