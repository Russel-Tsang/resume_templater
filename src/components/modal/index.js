import React, { useState } from 'react';
import { BlockTypes, BlockLabels, InputFieldLabels } from '@constants';
import styled from 'styled-components';

const { NAME, CONTACT_INFO, SECTION_TITLE, ITEM_TITLE_WITH_DATE, ITEM_CAPTION, BULLET_POINT, SPACE_BLOCK } = BlockTypes;
const { FULL_NAME_LBL, ADDRESS_LBL, EMAIL_LBL, PHONE_NUMBER_LBL, SECTION_TITLE_LBL, ITEM_TITLE_LBL, DATE_LBL, ITEM_CAPTION_LBL, BULLET_POINT_LBL } = InputFieldLabels;

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.4);
    top: 0;
    z-index: 1;
`;

const Form = styled.form`
    height: 400px; 
    width: 600px; 
    background-color: white; 
    display: flex; 
    flex-direction: column;
`;

const ModalHeader = styled.header`
    font-size: 28px;
    height: 80px; 
    background-color: #fafafa; 
    display: flex; 
    align-items: center;
    justify-content: center;
`;

const ModalBody = styled.section`
    height: 100%;
    padding: 0 50px; 

    display: grid;
    grid-template-rows: 40px auto 70px;
`;

const InputContainer = styled.section`
    grid-row: 2/3;
    display: flex;
    flex-direction: column;

    input {
        max-height: 60px;
        font-size: 16px;
        width: 75%;
        margin-top: 40px;
        border-bottom: 1px gray solid;
        padding: 5px 0px;
    }

    input:first-child {
        margin-top: 20px;
    }
`;

const SubmitButton = styled.button`
    grid-row: 3/4;
    width: 200px;
    background-color: #009dff;
    color: white;
    font-size: 16px;
    margin-bottom: 20px;
`;

const EditBlockTypeSection = styled.div`
    display: flex;
    grid-row: 1/2;
    margin-top: 20px;
`;

const Label = styled.label`
    width: 90px;
`;

const EditBlockTypeInputContainer = styled.div`
    position: relative;
    width: 100%;

    > * {
        width: 100%;
    }
`;

const EditBlockTypeButton = styled.div`
    font-size: 16px;
    text-align: left;
    background: none;
    border: none;
    border-bottom: 1px black solid;
    width: 200px;
`;

const BlockTypeOptionsContainer = styled.div`
    border: 1px black solid;
    cursor: pointer;
    position: absolute;
    background: white;
    width: 200px;
`;

const BlockTypeOptionsList = styled.ul`
    li {
        padding: 2px 0px;
        padding-left: 6px;
    }

    li:hover {
        background-color: #F2F3F4;
    }
`;

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
    }

    const selectBlock = (blockType) => {
        setSelectedBlockType(blockType);
        setSettingBlockType(false);
    }

    const blockTypeOptions = (
        <BlockTypeOptionsContainer>
            <BlockTypeOptionsList>
                <li onClick={() => selectBlock(NAME)}>{BlockLabels[NAME]}</li>
                <li onClick={() => selectBlock(CONTACT_INFO)}>{BlockLabels[CONTACT_INFO]}</li>
                <li onClick={() => selectBlock(SECTION_TITLE)}>{BlockLabels[SECTION_TITLE]}</li>
                <li onClick={() => selectBlock(ITEM_TITLE_WITH_DATE)}>{BlockLabels[ITEM_TITLE_WITH_DATE]}</li>
                <li onClick={() => selectBlock(ITEM_CAPTION)}>{BlockLabels[ITEM_CAPTION]}</li>
                <li onClick={() => selectBlock(BULLET_POINT)}>{BlockLabels[BULLET_POINT]}</li>
                <li onClick={() => selectBlock(SPACE_BLOCK)}>{BlockLabels[SPACE_BLOCK]}</li>
            </BlockTypeOptionsList>
        </BlockTypeOptionsContainer>
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
        props.onModalSubmit({ selectedBlockType, blockFields: inputFieldStates[selectedBlockType] });

    }

    return ( 
        <ModalBackground style={{ display: props.modalOpen ? 'flex' : 'none' }}>
            <Form onSubmit={ onModalSubmit }>
                <ModalHeader>
                    <h1>Add block</h1>
                </ModalHeader>
                <ModalBody>
                    <EditBlockTypeSection>
                        <Label htmlFor="edit-block-type">Block type: </Label>
                        <EditBlockTypeInputContainer>
                            <EditBlockTypeButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSettingBlockType(true);
                                }}
                            >
                                {BlockLabels[selectedBlockType]}
                            </EditBlockTypeButton>
                            {settingBlockType && blockTypeOptions}
                        </EditBlockTypeInputContainer>
                    </EditBlockTypeSection>
                    <InputContainer>
                        {inputFields[selectedBlockType]}
                    </InputContainer>
                    <SubmitButton type="submit">Add Block</SubmitButton>
                </ModalBody>
            </Form>
        </ModalBackground>
    );
}
 
export default Modal;