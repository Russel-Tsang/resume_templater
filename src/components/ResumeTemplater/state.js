import { useReducer } from 'react';
import { dummyResume } from '../../dummyData';
import { TemplaterStateTypes } from '@constants';

const { DRAGGER_MOUSE_DOWN, DRAGGER_MOUSE_UP, BLOCK_DROPPED, RESUME_TEXT_CHANGE, SET_BORDER, SET_INPUT_TO_ACTIVE, ADD_BLOCK, OPEN_MODAL } = TemplaterStateTypes;

function setInputToActive(idx, borderClasses) {
    return () => {
        let newBorderClasses = JSON.parse(JSON.stringify(borderClasses));

        // if an input is currently active, remove the border from that input
        if (newBorderClasses.currentActiveIndex !== null) newBorderClasses.state[newBorderClasses.currentActiveIndex] = "";

        // add border to the newly selected input and set it as currently active index
        newBorderClasses.state[idx] = "show-border";
        newBorderClasses.currentActiveIndex = idx;

        return newBorderClasses;
    }
}

const reducer = (state, { type, payload }) => {
    const { dragAndDropIndices: { draggingBlockIdx, slotIdx }, borderClasses } = state;

    switch (type) {
        case DRAGGER_MOUSE_DOWN: {
            return {
                ...state,
                grabState: 'grabbing',
                canDragState: true,
                dragAndDropIndices: {
                    ...state.dragAndDropIndices,
                    draggingBlockIdx: payload.idx
                }
            }
        }
        case DRAGGER_MOUSE_UP: {
            return {
                ...state,
                grabState: 'grab',
                canDragState: false
            }
        }
        case BLOCK_DROPPED: {
            let newResume = [...state.resume];
            [newResume[draggingBlockIdx], newResume[payload.idx]] = [newResume[payload.idx], newResume[draggingBlockIdx]];
            return {
                ...state,
                resume: newResume,
                ...( borderClasses.currentActiveIndex === draggingBlockIdx && setInputToActive(slotIdx)(borderClasses)()),
                canDragState: false,
                dragAndDropIndices: {
                    draggingBlockIdx: null,
                    slotIdx: null
                }
            }
        }
        case RESUME_TEXT_CHANGE: {
            const { idx, field, inputText } = payload;
            let newResume = [...state.resume];
            newResume[idx][field] = inputText;
            return {
                ...state,
                resume: newResume
            }
        }
        case SET_BORDER: {
            const { idx, setBorder } = payload;
            let borderClasses = JSON.parse(JSON.stringify(state.borderClasses));
            if (setBorder === true) borderClasses.state[idx] = "show-border";

            // prevent input's border from disappearing if input is currently active
            else if (borderClasses.currentActiveIndex !== idx) {
                borderClasses.state[idx] = "";
            }
            return {
                ...state,
                borderClasses
            }
        }
        case SET_INPUT_TO_ACTIVE: {
            const { idx } = payload;
            let borderClasses = JSON.parse(JSON.stringify(state.borderClasses));

            // if an input is currently active, remove the border from that input
            if (borderClasses.currentActiveIndex !== null) borderClasses.state[borderClasses.currentActiveIndex] = "";

            // add border to the newly selected input and set it as currently active index
            borderClasses.state[idx] = "show-border";
            borderClasses.currentActiveIndex = idx;

            return {
                ...state,
                borderClasses
            }
        }
        case ADD_BLOCK: {
            const { selectedBlockType, blockFields } = payload;
            let newResume = JSON.parse(JSON.stringify(state.resume));
            let block = {type: selectedBlockType, ...blockFields};
            newResume.push(block);
            return {
                ...state,
                resume: newResume,
                modalOpen: false
            }
        }
        case OPEN_MODAL: {
            return {
                ...state,
                modalOpen: true
            }
        }
        default: {
            return state;
        }
    }
}

const templaterState = () => {
    const [state, dispatch] = useReducer(reducer, {
        resume: dummyResume,
        borderClasses: { // tracks which inputs to show borders for
            state: new Array(dummyResume.length).fill(''),
            currentActiveIndex: null, // currentActiveIndex helps choose which input's border to hide after clicking into another
        },
        dragAndDropIndices: {
            draggingBlockIdx: null, // index of block currently being dragged
            slotIdx: null // index of block being dropped on 
        },
        grabState: 'grab', // will be 'grab' or 'grabbing'; helps define cursor state for .dragger
        canDragState: false, // determines whether or not user can drag block; sets to true onMouseDown of .dragger
        modalOpen: false
    });

    return { state, dispatch }
}

export default templaterState;