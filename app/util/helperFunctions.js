import React from 'react';
import DragWrap from "../components/wrappers/DragWrap";
import DropWrap from "../components/wrappers/DropWrap";
import Block from "../components/blocks/Block";
import Slot from "../components/blocks/Slot";
import SlotAndBlock from "../components/wrappers/SlotAndBlock";
import ContactInfo from "../components/blocks/ContactInfo";
import ItemTitleWithDate from "../components/blocks/ItemTitleWithDate";
import { BlockTypes, ItemTypes, BlockStyles } from "../constants/constants";

/************************************
 Higher order functions to return a 
 draggable/droppable component
 ************************************/

const dragify = (component) => DragWrap(component);
const dropify = (component) => DropWrap(component);

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
    const DroppableSlotAndBlock = dropify(SlotAndBlock);
    switch(blockOptions.type) {
        case NAME:
        case ITEM_CAPTION:
        case BULLET_POINT:
        case SECTION_TITLE:
        case SPACE_BLOCK:
            const DraggableBlock = dragify(Block);
            return (
                <DroppableSlotAndBlock
                    key={idx}
                    acceptType={ItemTypes.BLOCK}
                    dropAction={() => blockOptions.dropAction(idx, 'slot')}
                    dropWrapStyle={BlockStyles[blockOptions.type]}
                >
                    <DraggableBlock
                        itemType={ItemTypes.BLOCK}
                        typeOfBlock={blockOptions.type}
                        value={blockOptions.text}
                        onMouseDown={() => blockOptions.onMouseDown(idx, 'draggingBlock')}
                        blockStyle={BlockStyles[blockOptions.type]}
                    />
                    <Slot slotStyle={BlockStyles[blockOptions.type]}/>
                </DroppableSlotAndBlock>
            );
        case CONTACT_INFO:
            const DraggableContactInfo = dragify(ContactInfo);
            return (
                <DroppableSlotAndBlock
                    key={idx}
                    acceptType={ItemTypes.BLOCK}
                    dropAction={() => blockOptions.dropAction(idx, 'slot')}
                    dropWrapStyle={BlockStyles[blockOptions.type]}
                >
                    <DraggableContactInfo
                        itemType={ItemTypes.BLOCK}
                        typeOfBlock={blockOptions.type}
                        address={blockOptions.address}
                        email={blockOptions.email}
                        phoneNumber={blockOptions.phoneNumber}
                        onMouseDown={() => blockOptions.onMouseDown(idx, 'draggingBlock')}
                        blockStyle={BlockStyles[blockOptions.type]}
                    />
                    <Slot slotStyle={BlockStyles[blockOptions.type]}/>
                </DroppableSlotAndBlock>
            );
        case ITEM_TITLE_WITH_DATE:
            const DraggableItemTitleWithDate = dragify(ItemTitleWithDate);
            return (
                <DroppableSlotAndBlock
                    key={idx}
                    acceptType={ItemTypes.BLOCK}
                    dropAction={() => blockOptions.dropAction(idx, 'slot')}
                    dropWrapStyle={BlockStyles[blockOptions.type]}
                >
                    <DraggableItemTitleWithDate
                        itemType={ItemTypes.BLOCK}
                        typeOfBlock={blockOptions.type}
                        itemTitle={blockOptions.itemTitle}
                        date={blockOptions.date}
                        onMouseDown={() => blockOptions.onMouseDown(idx, 'draggingBlock')}
                        blockStyle={BlockStyles[blockOptions.type]}
                    />
                    <Slot slotStyle={BlockStyles[blockOptions.type]} />
                </DroppableSlotAndBlock>
            );
    }
}