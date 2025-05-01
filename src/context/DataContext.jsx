import { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [bars, setBars] = useState({});
  const [chart, setChart] = useState([]);      
  const [total, setTotal] = useState(0);  
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    if (!auth?.accessToken) return;
    try {
      setIsLoading(true);
      setFetchError(null);
      const response = await axiosPrivate.get('/widgets');
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
      const response = await axiosPrivate.get('/progressBars');
      setBars(response.data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChart = async () => {
    if (!auth?.accessToken) return;
    try {
      setIsLoading(true);
      setFetchError(null);
      const response = await axiosPrivate.get('/users/chart');
      setChart(response.data.chart.items);
      setTotal(response.data.chart.total);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{
      data,
      bars,
      setBars,
      isLoading,
      fetchError,
      refetchData: fetchData,
      fetchData,
      fetchBars,
      refetchBars: fetchBars,
      chart,
      setChart,
      total,
      setTotal,
      fetchChart,
      refetchChart: fetchChart
    }}>
      {children}
    </DataContext.Provider>
  );
};
