import React, { useState } from 'react';
import { BlockTypes, BlockLabels, InputFieldLabels } from '../../constants/constants';

const { NAME, CONTACT_INFO, SECTION_TITLE, ITEM_TITLE_WITH_DATE, ITEM_CAPTION, BULLET_POINT, SPACE_BLOCK } = BlockTypes;
const { FULL_NAME_LBL, ADDRESS_LBL, EMAIL_LBL, PHONE_NUMBER_LBL, SECTION_TITLE_LBL, ITEM_TITLE_LBL, DATE_LBL, ITEM_CAPTION_LBL, BULLET_POINT_LBL } = InputFieldLabels;


const Modal = (props) => {
    const [settingBlockType, setSettingBlockType] = useState(false);
    const [selectedBlockType, setSelectedBlockType] = useState(NAME);
    const [inputFieldStates, _setInputFieldStates] = useState({
        [NAME]: { text: '' },
        [CONTACT_INFO]: { address: '', email: '', phoneNumber: '' },
        [SECTION_TITLE]: { text: '' },
        [ITEM_TITLE_WITH_DATE]: { itemTitle: '', date: '' },
        [ITEM_CAPTION]: { text: '' },
        [BULLET_POINT]: { text: '' },
    });

    const _deepCloneInputFieldStates = () => ({
        [NAME]: { ...inputFieldStates[NAME] },
        [CONTACT_INFO]: { ...inputFieldStates[CONTACT_INFO] },
        [SECTION_TITLE]: { ...inputFieldStates[SECTION_TITLE] },
        [ITEM_TITLE_WITH_DATE]: { ...inputFieldStates[ITEM_TITLE_WITH_DATE] },
        [ITEM_CAPTION]: { ...inputFieldStates[ITEM_CAPTION] },
        [BULLET_POINT]: { ...inputFieldStates[BULLET_POINT] },
    })

    const setInputFieldStates = (field) => (e) => {
        let inputFieldStates = _deepCloneInputFieldStates();
        inputFieldStates[selectedBlockType][field] = e.target.value;
        _setInputFieldStates(inputFieldStates);
        console.log(inputFieldStates)
    }

    const selectBlock = (blockType) => {
        setSelectedBlockType(blockType);
        setSettingBlockType(false);
    }

    const blockTypeOptions = (
        <div className="block-type-options-div">
            <ul className="block-type-options-list">
                <li onClick={() => selectBlock(NAME)}>{BlockLabels[NAME]}</li>
                <li onClick={() => selectBlock(CONTACT_INFO)}>{BlockLabels[CONTACT_INFO]}</li>
                <li onClick={() => selectBlock(SECTION_TITLE)}>{BlockLabels[SECTION_TITLE]}</li>
                <li onClick={() => selectBlock(ITEM_TITLE_WITH_DATE)}>{BlockLabels[ITEM_TITLE_WITH_DATE]}</li>
                <li onClick={() => selectBlock(ITEM_CAPTION)}>{BlockLabels[ITEM_CAPTION]}</li>
                <li onClick={() => selectBlock(BULLET_POINT)}>{BlockLabels[BULLET_POINT]}</li>
                <li onClick={() => selectBlock(SPACE_BLOCK)}>{BlockLabels[SPACE_BLOCK]}</li>
            </ul>
        </div>
    )

    const inputFields = {
        [NAME]: <input placeholder={FULL_NAME_LBL} value={inputFieldStates[NAME]['text']} onChange={setInputFieldStates('text')} />,
        [SECTION_TITLE]: <input placeholder={SECTION_TITLE_LBL} value={inputFieldStates[SECTION_TITLE]['text']} onChange={setInputFieldStates('text')} />,
        [BULLET_POINT]: <input placeholder={BULLET_POINT_LBL} value={inputFieldStates[BULLET_POINT]['text']} onChange={setInputFieldStates('text')} />,
        [CONTACT_INFO]: <>
            <input placeholder={ADDRESS_LBL} value={inputFieldStates[CONTACT_INFO]['address']} onChange={setInputFieldStates('address')} />
            <input placeholder={EMAIL_LBL} value={inputFieldStates[CONTACT_INFO]['email']} onChange={setInputFieldStates('email')} />
            <input placeholder={PHONE_NUMBER_LBL} value={inputFieldStates[CONTACT_INFO]['phoneNumber']} onChange={setInputFieldStates('phoneNumber')} />
        </>,
        [ITEM_TITLE_WITH_DATE]: <>
            <input placeholder={ITEM_TITLE_LBL} value={inputFieldStates[ITEM_TITLE_WITH_DATE]['itemTitle']} onChange={setInputFieldStates('itemTitle')} />
            <input placeholder={DATE_LBL} value={inputFieldStates[ITEM_TITLE_WITH_DATE]['date']} onChange={setInputFieldStates('date')} />
        </>,
        [ITEM_CAPTION]: <>
            <input placeholder={ITEM_CAPTION_LBL} value={inputFieldStates[ITEM_CAPTION]['text']} onChange={setInputFieldStates('text')} />
        </>,
    }

    const onModalSubmit = (e) => {
        e.preventDefault();
        props.onModalSubmit(selectedBlockType, inputFieldStates[selectedBlockType]);

    }

    return ( 
        <div className="modal-background" style={ !props.modalOpen ? { display: 'none' } : {} }>
            <form onSubmit={ onModalSubmit }>
                <header className="modal-header">
                    <h1>Add block</h1>
                </header>
                <section className="modal-body">
                    <label htmlFor="edit-block-type">Block type</label>
                    <div className="edit-block-type-container">
                        <button id="edit-block-type" 
                            onClick={(e) => {
                                e.preventDefault();
                                setSettingBlockType(true);
                            }}
                        >
                            {BlockLabels[selectedBlockType]}
                        </button>
                        {settingBlockType && blockTypeOptions}
                    </div>
                    {inputFields[selectedBlockType]}
                    <button type="submit">Add Block</button>
                </section>
            </form>
        </div>
    );
}
 
export default Modal;