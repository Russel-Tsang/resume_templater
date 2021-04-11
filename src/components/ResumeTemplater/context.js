import React, { createContext } from 'react';
import templaterState from './state';

export const Context = createContext({});

export const Provider = ({ children }) => {
    return (
        <Context.Provider value={templaterState()}>
            {children}
        </Context.Provider>
    );
}