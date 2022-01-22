import React, { useState, createContext } from 'react';

export const RootContext = createContext();

export const RootProvider = ({ children }) => {
    const [rootStories, setRootStories] = useState([]);

    const value = { rootStories, setRootStories };
    return (
        <RootContext.Provider value={value}>{children}</RootContext.Provider>
    );
};
