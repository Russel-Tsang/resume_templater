import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css_reset.css';
import { componentFor } from './util/helperFunctions';
import Modal from './components/modal/';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { dummyResume } from './dummyData';

const App = () => {
    const [resume, setResume] = useState(dummyResume);
    const [draggingBlockIdx, setDraggingBlockIdx] = useState(null); // index of block currently being dragged
    const [slotIdx, setSlotIdx] = useState(null); // index of block being dropped on 
    const [grabState, setGrabState] = useState('grab'); // will be 'grab' or 'grabbing'; helps define cursor state for .dragger
    const [canDragState, setCanDragState] = useState(false); // determines whether or not user can drag block; sets to true onMouseDown of .dragger
    const [modalOpen, setModalOpen] = useState(false); // determines whether or not modal should be shown
    const [borderClasses, setBorderClasses] = useState({ // tracks which inputs to show borders for; currentActiveIndex helps choose which input's border to hide after clicking into another
        state: new Array(dummyResume.length).fill(''),
        currentActiveIndex: null,
    });

    useEffect(() => {
        switchBlocks();
    }, [slotIdx]);

    function deepCopyBorderClasses() {
        borderClasses.state = [...borderClasses.state];
        return borderClasses;
    }

    // set index state of respective item (draggingBlockIdx or slotIdx)
    //// if type === 'slot', then user must've attempted block-switch
    //// so set slotIdx state, and then switch blocks 
    function setBlockIdx(idx, type) {
        if (type === 'draggingBlock') setDraggingBlockIdx(idx);
        else if (type === 'slot') setSlotIdx(idx);
    }

    // swap blocks based on state indices, reset draggingBlockIdx and slotIdx to null
    function switchBlocks() {
        const { currentActiveIndex } = borderClasses;
        let newResume = resume.slice();
        [newResume[draggingBlockIdx], newResume[slotIdx]] = [newResume[slotIdx], newResume[draggingBlockIdx]];
        if (currentActiveIndex === draggingBlockIdx) setInputToActive(slotIdx)();
        setResume(newResume);
        setDraggingBlockIdx(null);
        setSlotIdx(null);
    }

    // add block to resume
    function addBlock(type, options) {
        let resume = JSON.parse(JSON.stringify(resume));
        let block = {type, ...options};
        resume.push(block);
        setResume(resume);
        setModalOpen(false);
    }

    // onChange handler that changes state of resume as user types into input field
    function onResumeEdit(idx) {
        return (field) => (inputText) => {
            let newResume = resume.slice();
            newResume[idx][field] = inputText;
            setResume(newResume);
        }
    }

    function setBorder(idx) {
        return (setBorder) => {
            let borderClasses = deepCopyBorderClasses();
            if (setBorder === true) borderClasses.state[idx] = "show-border";

            // prevent input's border from disappearing if input is currently active
            else if (borderClasses.currentActiveIndex !== idx) {
                borderClasses.state[idx] = "";
            }

            setBorderClasses(borderClasses);
        }
    }

    function setInputToActive(idx) {
        return () => {
            let borderClasses = deepCopyBorderClasses();

            // if an input is currently active, remove the border from that input
            if (borderClasses.currentActiveIndex !== null) borderClasses.state[borderClasses.currentActiveIndex] = "";

            // add border to the newly selected input and set it as currently active index
            borderClasses.state[idx] = "show-border";
            borderClasses.currentActiveIndex = idx;

            setBorderClasses(borderClasses);
        }
    }
    // for each object in resume, return correct component
    // while passing along callbacks for dragging and dropping events
    const slotAndBlocks = resume.map((block, idx) => {
        console.log(idx);
        if (block.type === 'name') console.log(borderClasses.state);
        const blockOptions = {
            onDraggerMouseDown: (idx, type) => {
                setGrabState('grabbing')
                setCanDragState(true);
                setBlockIdx(idx, type);
            },
            onDraggerMouseUp: () => { 
                setGrabState('grab');
                setCanDragState(false); 
            },
            onDragEnd: () => { 
                setCanDragState(false);
                setGrabState('grab');
            },
            dropAction: (idx, type) => {
                setCanDragState(false);
                setBlockIdx(idx, type);
            },
            onResumeEdit: onResumeEdit(idx),
            grabState: grabState,
            canDragState: canDragState,
            borderProps: { 
                getClass: borderClasses.state[idx], 
                setBorder: setBorder(idx),
                setInputToActive: setInputToActive(idx)
            }
        }
        return componentFor(Object.assign(block, blockOptions), idx)
    });

    return (
        <DndProvider backend={Backend}>
            <div id="app-body">
                <div id="resume-body">
                    {slotAndBlocks}
                </div>
                <div className="add-icon" onClick={() => setModalOpen(true)}>
                </div>
            </div>
            <Modal modalOpen={modalOpen} onModalSubmit={addBlock} />
        </DndProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))