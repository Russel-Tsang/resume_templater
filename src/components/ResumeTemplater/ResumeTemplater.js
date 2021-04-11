import React, { useContext } from 'react';
import { useComponentFor } from '@util/helperFunctions';
import Modal from '@components/modal';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { Context as TemplaterContext } from './context';
import { TemplaterStateTypes } from '@constants';

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
            <div id="app-body">
                <div id="resume-body">
                    {slotAndBlocks}
                </div>
                <div className="add-icon" onClick={() => templaterDispatch({ type: OPEN_MODAL })}>
                </div>
            </div>
            <Modal 
                modalOpen={modalOpen} 
                onModalSubmit={onModalSubmit} />
        </DndProvider>
    )
}

export default resumeTemplater;