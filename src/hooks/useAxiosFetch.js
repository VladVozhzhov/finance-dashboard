
import axios from 'axios';
import { useState, useEffect } from 'react';

const useAxiosFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                const response = await axios.get(url, { cancelToken: source.token });
                setData(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };
        console.log('Fetching:', url);
      
        fetchData();
      
        // Cleanup function to cancel the request on unmount
        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, [url]);
  
    return { data, loading, error };
};

export default useAxiosFetch;
