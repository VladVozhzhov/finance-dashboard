import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAxiosInterceptors = () => {
  const { auth, setAuth, logout } = useContext(AuthContext);

  useEffect(() => {
    const resInterceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshRes = await axios.get('http://localhost:3500/refresh', {
              withCredentials: true
            });
            const { accessToken } = refreshRes.data;
            setAuth(prev => ({ ...prev, accessToken }));
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;  // ← backticks!
            return axios(originalRequest);
          } catch (err) {
            logout();
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [auth, setAuth, logout]);
};

export default useAxiosInterceptors;
