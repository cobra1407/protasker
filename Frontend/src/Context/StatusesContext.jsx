import React, { createContext } from 'react';

export const StatusesContext = createContext(undefined);

export const StatusesProvider = ({ children }) => {

    const statuses = [
        { id: 0, value: 'En cours' },
        { id: 1, value: 'Bloqué' },
        { id: 2, value: 'Terminé' },
    ];

    return (
        <StatusesContext.Provider value={statuses}>
            {children}
        </StatusesContext.Provider>
    );
};
