import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = 'http://localhost:3500';

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const { auth, setAuth, logout } = useContext(AuthContext);

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const resIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error.config;
        if (error.response?.status === 403 && !prevRequest._retry) {
          prevRequest._retry = true;
          try {
            const refreshRes = await axiosPrivate.get('/refresh', {
              withCredentials: true
            });
            const newAccessToken = refreshRes.data.accessToken;
            setAuth(prev => ({ ...prev, accessToken: newAccessToken }));
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (refreshErr) {
            logout();
            return Promise.reject(refreshErr);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [auth, setAuth, logout]);

  return axiosPrivate;
};

export default useAxiosPrivate;
