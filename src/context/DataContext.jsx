import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const fetchData = async () => {
    if (!auth?.accessToken) return;
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await axios.get(
        `http://localhost:3500/widgets`,
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      );
      setData(response.data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth?.accessToken]);

  return (
    <DataContext.Provider value={{ data, isLoading, fetchError, refetchData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
