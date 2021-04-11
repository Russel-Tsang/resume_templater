export const ItemTypes = {
    BLOCK: 'block'
}

export const BlockTypes = {
    NAME: 'name',
    CONTACT_INFO: 'contact-info',
    SECTION_TITLE: 'section-title',
    ITEM_TITLE_WITH_DATE: 'item-title-with-date',
    ITEM_CAPTION: 'item-caption',
    BULLET_POINT: 'bullet-point',
    SPACE_BLOCK: 'space-block',
}

export const BlockStyles = {
    'name': { height: '40px' },
    'contact-info': { height: '40px' },
    'section-title': { height: '25px' },
    'item-title-with-date': { height: '22px' },
    'item-caption': { height: '20px' },
    'bullet-point': { height: '20px' }, 
    'space-block': { height: '20px' },
}

export const BlockLabels = {
    'name': 'Full Name',
    'contact-info': 'Contact Info',
    'section-title': 'Section Title',
    'item-title-with-date': 'Item Title with Date',
    'item-caption': 'Item Caption',
    'bullet-point': 'Bullet Point',
    'space-block': 'Space Block',
}

export const InputFieldLabels = {
    FULL_NAME_LBL: 'Full Name',
    ADDRESS_LBL: 'Address',
    EMAIL_LBL: 'Email',
    PHONE_NUMBER_LBL: 'Phone Number',
    SECTION_TITLE_LBL: 'Section Title',
    ITEM_TITLE_LBL: 'Item Title',
    DATE_LBL: 'Date',
    ITEM_CAPTION_LBL: 'Item Caption',
    BULLET_POINT_LBL: 'Bullet Point'
}

export const TemplaterStateTypes = {
    SWITCH_BLOCKS: 'switch-blocks',
    DRAGGER_MOUSE_DOWN: 'dragger-mouse-down',
    DRAGGER_MOUSE_UP: 'dragger-mouse-up',
    BLOCK_DROPPED: 'block-dropped',
    RESUME_TEXT_CHANGE: 'resume-text-change',
    SET_BORDER: 'set-border',
    SET_INPUT_TO_ACTIVE: 'set-input-to-active',
    ADD_BLOCK: 'add-block',
    OPEN_MODAL: 'open-modal',
}