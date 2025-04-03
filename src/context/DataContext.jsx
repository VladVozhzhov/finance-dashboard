import { createContext, useState, useEffect } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/users');
    return (
        <DataContext.Provider value={{
            fetchError, isLoading, data
        }}>
            {children}
        </DataContext.Provider>
    )
}