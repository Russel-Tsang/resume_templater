import React from 'react';
import SpaceBlock from "../components/blocks/SpaceBlock";
import Block from "../components/blocks/Block";
import Slot from "../components/blocks/Slot";
import SlotAndBlock from "../components/blocks/SlotAndBlock";
import ContactInfo from "../components/blocks/ContactInfo";
import ItemTitleWithDate from "../components/blocks/ItemTitleWithDate";
import { BlockTypes, ItemTypes, BlockStyles } from "../constants/constants";

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
    const { NAME, CONTACT_INFO, SECTION_TITLE, ITEM_TITLE_WITH_DATE, ITEM_CAPTION, BULLET_POINT, SPACE_BLOCK } = BlockTypes;
    switch(blockOptions.type) {
        case NAME:
        case ITEM_CAPTION:
        case BULLET_POINT:
        case SECTION_TITLE:
            return (
                <SlotAndBlock
                    key={idx}
                    acceptType={ItemTypes.BLOCK}
                    dropAction={() => blockOptions.dropAction(idx, 'slot')}
                    dropWrapStyle={BlockStyles[blockOptions.type]}
                    typeOfBlock={blockOptions.type}
                >
                    <Block
                        key={`block-${idx}`}
                        itemType={ItemTypes.BLOCK}
                        typeOfBlock={blockOptions.type}
                        value={blockOptions.text}
                        onMouseDown={() => blockOptions.onMouseDown(idx, 'draggingBlock')}
                        onResumeEdit={blockOptions.onResumeEdit}
                        blockStyle={BlockStyles[blockOptions.type]}
                    />
                    <Slot slotStyle={BlockStyles[blockOptions.type]}/>
                </SlotAndBlock>
            );
        case CONTACT_INFO:
            const { address, email, phoneNumber } = blockOptions;
            return (
                <SlotAndBlock
                    key={idx}
                    acceptType={ItemTypes.BLOCK}
                    dropAction={() => blockOptions.dropAction(idx, 'slot')}
                    dropWrapStyle={BlockStyles[blockOptions.type]}
                    typeOfBlock={blockOptions.type}
                >
                    <ContactInfo
                        itemType={ItemTypes.BLOCK}
                        typeOfBlock={blockOptions.type}
                        contactInfo={{ address, email, phoneNumber }}
                        onMouseDown={() => blockOptions.onMouseDown(idx, 'draggingBlock')}
                        onResumeEdit={blockOptions.onResumeEdit}
                        blockStyle={BlockStyles[blockOptions.type]}
                    />
                    <Slot slotStyle={BlockStyles[blockOptions.type]}/>
                </SlotAndBlock>
            );
        case ITEM_TITLE_WITH_DATE:
            return (
                <SlotAndBlock
                    key={idx}
                    acceptType={ItemTypes.BLOCK}
                    dropAction={() => blockOptions.dropAction(idx, 'slot')}
                    dropWrapStyle={BlockStyles[blockOptions.type]}
                    typeOfBlock={blockOptions.type}
                >
                    <ItemTitleWithDate
                        itemType={ItemTypes.BLOCK}
                        typeOfBlock={blockOptions.type}
                        itemTitle={blockOptions.itemTitle}
                        date={blockOptions.date}
                        onMouseDown={() => blockOptions.onMouseDown(idx, 'draggingBlock')}
                        onResumeEdit={blockOptions.onResumeEdit}
                        blockStyle={BlockStyles[blockOptions.type]}
                    />
                    <Slot slotStyle={BlockStyles[blockOptions.type]} />
                </SlotAndBlock>
            );
        case SPACE_BLOCK:
            return (
                <SlotAndBlock
                    key={idx}
                    acceptType={ItemTypes.BLOCK}
                    dropAction={() => blockOptions.dropAction(idx, 'slot')}
                    dropWrapStyle={BlockStyles[blockOptions.type]}
                    typeOfBlock={blockOptions.type}
                >
                    <SpaceBlock
                        itemType={ItemTypes.BLOCK}
                        typeOfBlock={blockOptions.type}
                        itemTitle={blockOptions.itemTitle}
                        date={blockOptions.date}
                        onMouseDown={() => blockOptions.onMouseDown(idx, 'draggingBlock')}
                        blockStyle={BlockStyles[blockOptions.type]}
                    />
                    <Slot slotStyle={BlockStyles[blockOptions.type]} />
                </SlotAndBlock>
            ); 
    }
}