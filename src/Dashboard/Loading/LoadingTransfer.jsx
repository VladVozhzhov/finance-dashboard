import React, { useState, useEffect, useContext } from "react";
import LoadingScreen from "./LoadingScreen";
import Dashboard from "../../Dashboard";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";

const LoadingTransfer = () => {
  const { auth } = useContext(AuthContext);
  const { fetchBars, fetchData, fetchChart } = useContext(DataContext);

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);
        if (auth?.accessToken && auth?.userId) {
          await new Promise(resolve => setTimeout(resolve, 0));
          await fetchData();
          await fetchBars();
          await fetchChart();
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
      setInitialLoading(false);
    };
  
    loadData();
  }, [auth?.accessToken, auth?.userId]);

  return (
    <div>
      {initialLoading ? <LoadingScreen /> : <Dashboard />}
    </div>
  );
};

export default LoadingTransfer;
