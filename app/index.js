import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css_reset.css';
import { BlockTypes } from './constants/constants';
import { componentFor } from './util/helperFunctions';
import Modal from './components/modal/';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

const { NAME, CONTACT_INFO, SECTION_TITLE, ITEM_TITLE_WITH_DATE, ITEM_CAPTION, BULLET_POINT, SPACE_BLOCK } = BlockTypes;
// Some dummy data; we'll be receiving this data from some data storage later on
const dummyResume = [
    { type: NAME, text: 'Russel Tsang' },
    { type: CONTACT_INFO, address: 'Brooklyn NY', email: 'test@test.com', phoneNumber: '123-123-1234' },
    { type: SECTION_TITLE, text: 'Experience' },
    { type: ITEM_TITLE_WITH_DATE, itemTitle: 'First Workplace', date: 'Jan 2019' },
    { type: ITEM_CAPTION, text: 'First Job Position' },
    { type: BULLET_POINT, text: 'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce' },
    { type: BULLET_POINT, text: 'Brussels sprout coriander water chestnut gourd swiss beetroot chard chicory earthnut pea potato' },
    { type: SPACE_BLOCK },
    { type: ITEM_TITLE_WITH_DATE, itemTitle: 'Second Workplace', date: 'Feb 2020' },
    { type: ITEM_CAPTION, text: 'Second Job Position' },
    { type: BULLET_POINT, text: 'Nori grape silver beet broccoli kombu beet greens quandong swiss' },
    { type: BULLET_POINT, text: 'Celery quandong swiss chard chicory earthnut pea potato' },
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resume: dummyResume,
            draggingBlockIdx: null, // index of block currently being dragged
            slotIdx: null, // index of block being dropped on 
            grabState: 'grab', // will be 'grab' or 'grabbing'; helps define cursor state for .dragger
            canDragState: false, // determines whether or not user can drag block; sets to true onMouseDown of .dragger
            modalOpen: false, // determines whether or not modal should be shown
            borderClasses: { // tracks which inputs to show borders for; currentActiveIndex helps choose which input's border to hide after clicking into another
                state: [new Array(dummyResume.length).fill('')],
                currentActiveIndex: null,
            },
        }

        this.setBlockIdx = this.setBlockIdx.bind(this);
        this.addBlock = this.addBlock.bind(this);
    }

    deepCopyBorderClasses() {
        let borderClasses = { ...this.state.borderClasses };
        borderClasses.state = [...borderClasses.state];
        return borderClasses;
    }

    // set index state of respective item (draggingBlockIdx or slotIdx)
    //// if type === 'slot', then user must've attempted block-switch
    //// so set slotIdx state, and then switch blocks 
    setBlockIdx(idx, type) {
        if (type === 'draggingBlock') this.setState({ draggingBlockIdx: idx });
        else if (type === 'slot') this.setState({ slotIdx: idx }, this.switchBlocks);
    }

    // swap blocks based on state indices, reset draggingBlockIdx and slotIdx to null
    switchBlocks() {
        const { draggingBlockIdx, slotIdx, borderClasses: { currentActiveIndex } } = this.state;
        let resume = this.state.resume.slice();
        [resume[draggingBlockIdx], resume[slotIdx]] = [resume[slotIdx], resume[draggingBlockIdx]];
        if (currentActiveIndex === draggingBlockIdx) this.setInputToActive(slotIdx)();
        this.setState({ resume, draggingBlockIdx: null, slotIdx: null });
    }

    // add block to resume
    addBlock(type, options) {
        let resume = JSON.parse(JSON.stringify(this.state.resume));
        let block = {type, ...options};
        resume.push(block);
        this.setState({ resume, modalOpen: false });
    }

    // onChange handler that changes state of resume as user types into input field
    onResumeEdit(idx) {
        return (field) => (inputText) => {
            let resume = this.state.resume.slice();
            resume[idx][field] = inputText;
            this.setState({ resume });
        }
    }

    setBorder(idx) {
        return (setBorder) => {
            let borderClasses = this.deepCopyBorderClasses();
            if (setBorder === true) borderClasses.state[idx] = "show-border";

            // prevent input's border from disappearing if input is currently active
            else if (this.state.borderClasses.currentActiveIndex !== idx) {
                borderClasses.state[idx] = "";
            }

            this.setState({ borderClasses });
        }
    }

    setInputToActive(idx) {
        return () => {
            let borderClasses = this.deepCopyBorderClasses();

            // if an input is currently active, remove the border from that input
            if (borderClasses.currentActiveIndex !== null) borderClasses.state[borderClasses.currentActiveIndex] = "";

            // add border to the newly selected input and set it as currently active index
            borderClasses.state[idx] = "show-border";
            borderClasses.currentActiveIndex = idx;

            this.setState({ borderClasses });
        }
    }

    render() {
        // for each object in this.state.resume, return correct component
        // while passing along callbacks for dragging and dropping events
        const slotAndBlocks = this.state.resume.map((block, idx) => {
            const blockOptions = {
                onDraggerMouseDown: (idx, type) => {
                    this.setState({ grabState: 'grabbing', canDragState: true });
                    this.setBlockIdx(idx, type);
                },
                onDraggerMouseUp: () => this.setState({ grabState: 'grab', canDragState: false }),
                onDragEnd: () => this.setState({ canDragState: false, grabState: 'grab' }),
                dropAction: (idx, type) => {
                    this.setState({ canDragState: false });
                    this.setBlockIdx(idx, type);
                },
                onResumeEdit: this.onResumeEdit(idx),
                grabState: this.state.grabState,
                canDragState: this.state.canDragState,
                borderProps: { 
                    getClass: this.state.borderClasses.state[idx], 
                    setBorder: this.setBorder(idx),
                    setInputToActive: this.setInputToActive(idx)
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
                    <div className="add-icon" onClick={() => this.setState({ modalOpen: true })}>
                    </div>
                </div>
                <Modal modalOpen={this.state.modalOpen} onModalSubmit={this.addBlock} />
            </DndProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))