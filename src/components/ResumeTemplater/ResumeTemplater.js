import React, { useContext } from 'react';
import { useComponentFor } from '@util/helperFunctions';
import Modal from '@components/modal';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { Context as TemplaterContext } from './context';
import { TemplaterStateTypes } from '@constants';
import styled from 'styled-components';

const ResumeTemplaterContainer = styled.div`
    display: flex;
    width: 932px;
    margin: 0 auto;
`;

const Resume = styled.div`
    width: 800px;
    border: 1px black solid;
    padding-top: 20px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 20px;
    margin: 0 auto;
    font-family: 'Times New Roman', Times, serif;
`;

const AddIcon = styled.div`
    height: 50px;
    width: 50px;
    border: 1px black solid;
`;

const resumeTemplater = () => {
    const { state: { resume, modalOpen }, dispatch: templaterDispatch } = useContext(TemplaterContext);
    const { OPEN_MODAL, ADD_BLOCK } = TemplaterStateTypes;
    const { componentFor } = useComponentFor();

    // for each object in resume, return correct component
    const slotAndBlocks = resume.map((block, idx) => componentFor(block, idx));

    function onModalSubmit({ selectedBlockType, blockFields }) {
        templaterDispatch({ type: ADD_BLOCK, payload: { selectedBlockType, blockFields } })
    }
    
    return (
        <DndProvider backend={Backend}>
            <ResumeTemplaterContainer>
                <Resume>
                    {slotAndBlocks}
                </Resume>
                <AddIcon onClick={() => templaterDispatch({ type: OPEN_MODAL })}>
                </AddIcon>
            </ResumeTemplaterContainer>
            <Modal 
                modalOpen={modalOpen} 
                onModalSubmit={onModalSubmit} 
            />
        </DndProvider>
    )
}

export default resumeTemplater;