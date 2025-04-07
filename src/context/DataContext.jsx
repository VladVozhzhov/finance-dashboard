import { createContext, useState } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { data: initialData, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/users');
  const [data, setData] = useState(initialData); // Add state for data and its setter

  return (
    <DataContext.Provider value={{ data, setData, fetchError, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};