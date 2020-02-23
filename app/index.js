import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BlockTypes } from './constants/constants';
import { componentFor } from './util/helperFunctions';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

class App extends React.Component {
    constructor(props) {
        super(props);

        // Some dummy data; we'll be receiving this data from some data storage later on
        const { NAME, CONTACT_INFO, SECTION_TITLE, ITEM_TITLE_WITH_DATE, ITEM_CAPTION, BULLET_POINT, SPACE_BLOCK } = BlockTypes;
        this.state = {
            resume: [
                { type: NAME, text: 'Russel Tsang' },
                { type: CONTACT_INFO, address: 'Brooklyn NY', email: 'test@test.com', phoneNumber: '123-123-1234'},
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
            ],
            // index of block currently being dragged
            draggingBlockIdx: null,
            slotIdx: null
        }

        this.setBlockIdx = this.setBlockIdx.bind(this);
    }

    // set index state of respective item
    // if type === 'slot', then user must've attempted block-switch
    // so call this.dropAction after setting slotIdx state
    setBlockIdx(idx, type) {
        if (type === 'draggingBlock') this.setState({ draggingBlockIdx: idx });
        else if (type === 'slot') this.setState({ slotIdx: idx }, this.dropAction);
    }

    // swap blocks based on state indices, reset draggingBlockIdx and slotIdx to null
    dropAction() {
        const { draggingBlockIdx, slotIdx } = this.state;
        let resume = this.state.resume.slice();
        [resume[draggingBlockIdx], resume[slotIdx]] = [resume[slotIdx], resume[draggingBlockIdx]];
        this.setState({ resume, draggingBlockIdx: null, slotIdx: null });
    }



    render() {
        // for each object in this.state.resume, return correct component
        // while passing along callbacks for dragging and dropping events
        const slotAndBlocks = this.state.resume.map((block, idx) => {
            const blockOptions = {
                dropAction: this.setBlockIdx,
                onMouseDown: this.setBlockIdx,
            }
            return componentFor(Object.assign(block, blockOptions), idx)
        });

        return (
            <DndProvider backend={Backend}>
                <div id="app-body">
                    {slotAndBlocks}
                </div>
            </DndProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))