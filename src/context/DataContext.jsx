import { createContext, useState } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/users');

  return (
    <DataContext.Provider value={{ data, fetchError, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};
