import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { auth, logout } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [bars, setBars] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    if (!auth?.accessToken) return;
    try {
      setIsLoading(true);
      setFetchError(null);
      const response = await axiosPrivate.get(`/widgets`);
      setData(response.data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBars = async () => {
    if (!auth?.accessToken) return;
    try {
      setIsLoading(true);
      setFetchError(null);
      const response = await axiosPrivate.get(`/progressBars`);
      setBars(response.data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (auth?.accessToken) {
      fetchBars();
    }
  }, [auth]);

  return (
    <DataContext.Provider value={{ data, bars, setBars, isLoading, fetchError, refetchData: fetchData, fetchData, fetchBars, refetchBars: fetchBars, }}>
      {children}
    </DataContext.Provider>
  );
};
