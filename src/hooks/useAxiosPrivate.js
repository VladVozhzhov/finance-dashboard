import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = "http://localhost:3500";

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const { auth, setAuth, logout } = useContext(AuthContext);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"] && auth?.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;

        if ((error.response?.status === 401 || error.response?.status === 403) && !prevRequest?._retry) {
          prevRequest._retry = true;

          try {
            const refreshResponse = await axios.get(`${BASE_URL}/refresh`, {
              withCredentials: true,
            });

            const newAccessToken = refreshResponse?.data?.accessToken;

            setAuth(prev => ({
              ...prev,
              accessToken: newAccessToken,
            }));

            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            console.warn("Refresh failed. Logging out:", refreshError);
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.accessToken, setAuth, logout]);

  return axiosPrivate;
};

export default useAxiosPrivate;
