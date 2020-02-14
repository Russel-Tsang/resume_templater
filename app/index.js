import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './components/Title';
import Name from './components/Name';
import ContactInfo from './components/ContactInfo';

class App extends React.Component {
    render() {
        return (
            <div id="app-body">
                <Name value="Russel Tsang" />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))