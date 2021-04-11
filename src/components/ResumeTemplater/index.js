import React from 'react';
import ResumeTemplater from './ResumeTemplater';
import { Provider } from './context';

export default () => {
    return (
        <Provider>
            <ResumeTemplater />
        </Provider>
    );
}