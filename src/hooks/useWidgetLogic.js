import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import { format } from 'date-fns';
import useAxiosPrivate from './useAxiosPrivate';

const useWidgetLogic = (type) => {
  const { auth } = useContext(AuthContext);
  const { data, isLoading, fetchError, refetchData } = useContext(DataContext);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const currentDate = format(new Date(), 'MMMM d yyyy');

  useEffect(() => {
    if (data && typeof data === 'object') {
      const widgetData = data[type];
      if (widgetData) {
        setItems(Object.entries(widgetData));
      }
    }
  }, [data, type]);

  const handleChange = (e) => setFormData(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = parseFloat(formData);
    if (!auth?.userId || isNaN(input)) return;

    try {
      const existingIndex = items.findIndex(([date]) => date === currentDate);
      if (existingIndex !== -1) {
        const updated = [...items];
        updated[existingIndex] = [currentDate, input];
        setItems(updated);
      } else {
        setItems(prev => [...prev, [currentDate, input]]);
      }

      await axiosPrivate.post(`/users/${auth.userId}/widgets/${type}`, {
        data: { [currentDate]: input },
      });

      setFormData('');
      refetchData();
    } catch (err) {
      console.error(`Error submitting ${type}:`, err);
    }
  };

  const handleDelete = async (date) => {
    try {
      await axiosPrivate.delete(`/users/${auth.userId}/widgets/${type}`, {
        data: { date },
      });
      setItems(prev => prev.filter(([d]) => d !== date));
      refetchData();
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  };

  return {
    items,
    formData,
    handleChange,
    handleSubmit,
    handleDelete,
    isLoading,
    fetchError,
  };
};

export default useWidgetLogic;
