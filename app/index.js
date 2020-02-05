import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './components/title';

class App extends React.Component {
    render() {
        return (
            <div id="app-body">
                <Title title="Resume App"/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))