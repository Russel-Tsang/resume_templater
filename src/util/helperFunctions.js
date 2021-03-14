import React from 'react';
import SpaceBlock from "../components/blocks/SpaceBlock";
import Block from "../components/blocks/Block";
import Slot from "../components/blocks/Slot";
import SlotAndBlock from "../components/blocks/SlotAndBlock";
import ContactInfo from "../components/blocks/ContactInfo";
import ItemTitleWithDate from "../components/blocks/ItemTitleWithDate";
import { BlockTypes, ItemTypes, BlockStyles } from "@constants";

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
 
export const componentFor = function(blockOptions, idx) {
    return (
        <SlotAndBlock
            key={idx}
            acceptType={ItemTypes.BLOCK}
            dropAction={() => blockOptions.dropAction(idx, 'slot')}
            dropWrapStyle={BlockStyles[blockOptions.type]}
            typeOfBlock={blockOptions.type}
        >
            {getCorrectDragBlock(blockOptions, idx)}
            <Slot slotStyle={BlockStyles[blockOptions.type]}/>
        </SlotAndBlock>
    );
}

function getCorrectDragBlock(blockOptions, idx) {
    const { NAME, CONTACT_INFO, SECTION_TITLE, ITEM_TITLE_WITH_DATE, ITEM_CAPTION, BULLET_POINT, SPACE_BLOCK } = BlockTypes;

    const commonProps = {
        itemType: ItemTypes.BLOCK,
        typeOfBlock: blockOptions.type,
        onDraggerMouseDown: () => blockOptions.onDraggerMouseDown(idx, 'draggingBlock'),
        onDraggerMouseUp: blockOptions.onDraggerMouseUp,
        onDragEnd: blockOptions.onDragEnd,
        grabState: blockOptions.grabState,
        canDragState: blockOptions.canDragState,
        blockStyle: BlockStyles[blockOptions.type],
        onResumeEdit: blockOptions.onResumeEdit,
        borderProps: blockOptions.borderProps
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