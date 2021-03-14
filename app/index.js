import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css_reset.css';
import ResumeTemplater from './components/ResumeTemplater';

const App = () => {
    return (
        <ResumeTemplater />
    );
}

ReactDOM.render(<App />, document.getElementById('app'))